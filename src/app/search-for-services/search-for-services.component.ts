import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTypeEnum, DirectionTypeEnum, SearchByEnum } from '../obt/Dto & Enum/services-type.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ExtendInformationService } from '../services/global services/extand-info.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../services/logger.service';
import { SearchForServicesService } from '../services/search-for-services.service';
import { AirportByName } from '../obt/Dto & Enum/Airports Dto/airport-from-db.dto';

@Component({
  selector: 'app-search-for-services',
  templateUrl: './search-for-services.component.html',
  styleUrls: ['./search-for-services.component.scss']
})
export class SearchForServicesComponent implements OnInit, OnDestroy {

  @ViewChild('airportFrom') airportFrom: ElementRef;

  searchForServicesForm: FormGroup;
  _selectedAirportFrom: any;
  _airportList: AirportByName[] = [];

  /**
   * Creates an instance of SearchForServicesComponent.
   * @param {Router} _router
   * @param {ExtendInformationService} _extandInfo
   * @param {LoggerService} _logger
   * @memberof SearchForServicesComponent
   */
  constructor(private _router: Router,
    private _extandInfo: ExtendInformationService,
    private _logger: LoggerService,
    private _searchForServicesService: SearchForServicesService) { }

  _searchByOptions: string[] = [
    SearchByEnum[SearchByEnum.Schedule],
    SearchByEnum[SearchByEnum.Price]
  ];

  _directions: string[] = [
    DirectionTypeEnum[DirectionTypeEnum.OneWay],
    DirectionTypeEnum[DirectionTypeEnum.RoundTrip],
    DirectionTypeEnum[DirectionTypeEnum.MultiDestination]
  ];

  _servicesType: string[] = [
    ServiceTypeEnum[ServiceTypeEnum.Flight],
    ServiceTypeEnum[ServiceTypeEnum.Hotel],
    ServiceTypeEnum[ServiceTypeEnum.Car]
  ];

  ngOnInit() {
    this.searchForServicesForm = new FormGroup({
      servicesType: new FormControl(null),
      flightDirection: new FormControl(null),
    });

    this.onKeyUp();
  }

  navigateToNext(): void {
    // TODO: Change method name. change logic.
    this._router.navigate(['wait-for-results']);
  }

  onKeyUp() {
    this._searchForServicesService.KuyUpSubscription =
      Observable.fromEvent(this.airportFrom.nativeElement, 'keyup')
        .pluck('target', 'value')
        .debounceTime(1000)
        .distinctUntilChanged()
        .filter((val: string) => val.length > 2)
        .mergeMap((value: string) => this._extandInfo.getAirportListByDemand(value))
        .subscribe((airportList: any) => {
          try {
            this._airportList = airportList.Table;
          } catch (error) {
            this._logger.onError(error);
          }
        });
  }

  handleAirportSelect(event) {

  }

  ngOnDestroy(): void {
    this._searchForServicesService.KuyUpSubscription.unsubscribe();
  }
}
