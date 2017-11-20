import { Component, OnInit, Input, OnDestroy, Output, EventEmitter, ViewChild } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { ObtService } from '../../../services/obt.service';
import { FilterNameEnum } from './../../Dto & Enum/Filter Dto/filter-name.enum';
import { FilterService } from '../../../services/filter.service';
import { LoggerService } from '../../../services/logger.service';
import { Subscription } from 'rxjs/Subscription';
import { DestinationList, ItinerariesList } from '../../Dto & Enum/Flight Dto/flight-result.dto';
import { FilterEvent } from '../../Dto & Enum/EventsDto/filter.event';
import { FlightSelectedEvent } from '../../Dto & Enum/EventsDto/flight.event';
import { AirlineInfo } from '../../Dto & Enum/Airline Dto/airline-names.dto';

@Component({
  selector: 'app-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.css']
})
export class ResultsListComponent implements OnInit, OnDestroy {

  // Input properties
  @Input() _index: number = 0;
  @Input() _itinerariesList: DestinationList;
  @Input() _currentScreen: number = 0;

  // Output events
  @Output() onFlightSelectedUnselected = new EventEmitter<FlightSelectedEvent>();

  // Private TypeScript properties
  private _sliderFilterSubscription: Subscription;
  private _stopQuantityFilterSubscription: Subscription;
  private _airlineFilterSubscription: Subscription;
  private _showResultsOutsidePolicySubscription: Subscription;
  private _policyLevelRatingSubscription: Subscription;

  // Connected To DOM properties
  _byPriceFilter: { min: number, max: number } = { min: 0, max: 99999 };
  _byFlightArrivelHour: { min: number, max: number } = { min: 0, max: 23 };
  _byFlightDeparturelHour: { min: number, max: number } = { min: 0, max: 23 };
  _byStopQuantity: number[] = [];
  _byAirline: AirlineInfo[];
  _byShowResultsOutOfPolicy: boolean = false;
  _byPolicyLevelRating: number = 0;

  /**
   * Creates an instance of ResultsListComponent.
   * @param {ApiService} _apiService
   * @param {LoggerService} _logger
   * @param {ObtService} _obtService
   * @param {FilterService} _filterService
   * @memberof ResultsListComponent
   */
  constructor(
    private _apiService: ApiService,
    private _logger: LoggerService,
    private _obtService: ObtService,
    private _filterService: FilterService
  ) { }

  ngOnInit(): void {
    this.subscribeToFilterChanges();
  }

  subscribeToFilterChanges(): void {
    this._sliderFilterSubscription = this._filterService.OnSliderFilterChangeValue
      .subscribe((filterEventData: FilterEvent) => this.handleOnSliderFilterChangeValue(filterEventData));

    this._stopQuantityFilterSubscription = this._filterService.OnStopQuantityFilterToggle
      .subscribe((stopQuantityArray: number[]) => this.handleOnStopQuantityFilterToggle(stopQuantityArray));

    this._airlineFilterSubscription = this._filterService.OnAirlineFilterToggle.
      subscribe((airlineArray: AirlineInfo[]) => this.handleOnAirlineFilterToggle(airlineArray));

    this._showResultsOutsidePolicySubscription = this._filterService.OnShowResultsOutOfPolicyToggle
      .subscribe((toShowResultsOutOfPolicy: boolean) => this.handleOnShowResultsOutOfPolicy(toShowResultsOutOfPolicy));

    this._policyLevelRatingSubscription = this._filterService.OnPolicyLevelChanged
      .subscribe((policyLevel: number) => this.handleOnPolicyLevelChanged(policyLevel));
  }

  /**
   * Handle the slider filter events changes.
   * @param {FilterEvent} filterEventData
   * @memberof ResultsListComponent
   */
  private handleOnSliderFilterChangeValue(filterEventData: FilterEvent) {
    switch (filterEventData.sender) {
      case FilterNameEnum.Price:
        this._byPriceFilter = filterEventData.values;
        break;
      case FilterNameEnum.ArrivelHour:
        this._byFlightArrivelHour = filterEventData.values;
        break;
      case FilterNameEnum.DepartueHour:
        this._byFlightDeparturelHour = filterEventData.values;
        break;
      default:
        this._logger.onError('There is no such filter.');
        break;
    }
  }

  private handleOnStopQuantityFilterToggle(stopQuantityArray: number[]): void {
    this._byStopQuantity = stopQuantityArray;
  }

  private handleOnAirlineFilterToggle(airlineArray: AirlineInfo[]): void {
    this._byAirline = airlineArray;
  }

  private handleOnShowResultsOutOfPolicy(showResultsOutOfPolicy: boolean): void {
    this._byShowResultsOutOfPolicy = showResultsOutOfPolicy;
  }

  private handleOnPolicyLevelChanged(policyLevel: number): void {
    this._byPolicyLevelRating = policyLevel;
  }

  /**
   * @memberof ResultsListComponent
   */
  ngOnDestroy(): void {
    this._stopQuantityFilterSubscription.unsubscribe();
    this._sliderFilterSubscription.unsubscribe();
    this._airlineFilterSubscription.unsubscribe();
    this._showResultsOutsidePolicySubscription.unsubscribe();
    this._policyLevelRatingSubscription.unsubscribe();
  }
}
