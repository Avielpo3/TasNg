import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { LoggerService } from '../services/logger.service';
import { ApiService } from '../services/api.service';
import { ObtService } from '../services/obt.service';
import { element } from 'protractor';
import { FilterService } from '../services/filter.service';
import { FilterNameEnum } from './Dto & Enum/filter-name-enum';
import { FlightGlobalInfo } from './Dto & Enum/flights-global-info';
import { FlightResultDto, DestinationList } from './Dto & Enum/flight-result-dto';
import { SortByService } from '../services/sort.service';
import { SortByDto } from './Dto & Enum/PrimeNgDto/SortByDto';
import { SortByOptions } from './Dto & Enum/sort-by.enum';
import { Dropdown } from 'primeng/components/dropdown/dropdown';
import { FlightSelectedEvent } from './Dto & Enum/EventsDto/flight.event';
import { ServiceList, ServiceType } from './Dto & Enum/service-list.dto';
import { EnumUtils } from '../Utils/enum-utils';
import { ExtendInformationService } from '../services/global services/extand-info.service';
import { SelectFlightResultService } from '../services/select-flight.service';

/**
 * The main componet responisble for all the project logic.
 * @export
 * @class ObtComponent
 * @implements {OnInit}
 */
@Component({
  selector: 'app-obt',
  templateUrl: './obt.component.html',
  styleUrls: ['./obt.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ObtComponent implements OnInit {
  requestId: string;

  private _isFirstJson: boolean = true;

  _flightResultDto: FlightResultDto;
  _destinationsList: DestinationList[];
  _selectedFlightArray: FlightSelectedEvent[] = [];
  _flightGlobalInfo: FlightGlobalInfo;

  _listResultScreenCount: number;

  _currentScreen: number = 0;
  _isResultArrived: boolean = false;
  _selectedSortByFilter: string;
  _sortByDto: SortByDto;

  _isFlightSelected: boolean = false;
  /**
   * Creates an instance of ObtComponent.
   * @param {ApiService} _apiService
   * @param {LoggerService} _logger
   * @param {ObtService} _obtService
   * @param {FilterService} _filterService
   * @param {SortByService} _sortByService
   * @memberof ObtComponent
   */
  constructor(
    private _apiService: ApiService,
    private _logger: LoggerService,
    private _obtService: ObtService,
    private _filterService: FilterService,
    private _sortByService: SortByService,
    private extandInfoService: ExtendInformationService,
    private _selectedFlightService: SelectFlightResultService

  ) {
    this._sortByDto = _sortByService.Sort;
  }

  ngOnInit() {
    this.subscribeToFlightResults();
    this.subscribeToFlightSelectedUnselected();
  }

  /**
   * @param {FlightResultDto} flightResultDto
   * @memberof ObtComponent
   */
  InitalizeComponent(flightResultDto: FlightResultDto): void {
    this._flightResultDto = flightResultDto;
    this._destinationsList = flightResultDto.Answer.DestinationList;
    this._isFirstJson = false;
    this._listResultScreenCount = this._destinationsList.length - 1;

    this._obtService.onGetFlightGlobalInfo.subscribe((flightFlobalInfo: FlightGlobalInfo) => {
      this._flightGlobalInfo = flightFlobalInfo;
      this._isResultArrived = true;
    });
  }

  /**
   * TODO: Get logic out from here to service.
   * @memberof ObtComponent
   */
  private subscribeToFlightResults(): void {
    this._obtService.onGetFlightResultsJson.subscribe(
      (flightResultDto: FlightResultDto) => {
        if (this._isFirstJson) {
          this.InitalizeComponent(flightResultDto);
        } else {
          flightResultDto.Answer.DestinationList.forEach((destList, index) => {
            this._destinationsList[index].ItinerariesList.push(...destList.ItinerariesList);
          });
        }
      },
      (error: any) => this._logger.onException(error),
      () => {
        this._logger.logInfo('Completed read JSON');
      }
    );
  }

  private subscribeToFlightSelectedUnselected(): void {
    this._selectedFlightService.OnFlightResultSelectedUnselected
      .subscribe((flightEvent: FlightSelectedEvent) => {
        const isSelected: boolean = flightEvent.IsSelected;
        const screenNumber: number = flightEvent.ScreenNumber;

        const isExist = this._selectedFlightArray.some(fe => fe.ScreenNumber === screenNumber);
        if (!isExist) {
          this._selectedFlightArray.push(flightEvent);
        } else {
          this._selectedFlightArray.find(fe => fe.ScreenNumber === screenNumber).IsSelected = isSelected;
        }
      });
  }

  getFlightResults(): boolean {
    this._obtService.getFlightsResultFromApi();

    return false;
  }

  handleSortByChange(event) {
    const sortByFilterValue = event.value;
    this._sortByService.handleSortByChange(sortByFilterValue);
  }


  getMockFlightResults(): void {
    this._obtService.getMockFlightResults();
  }

  clearSortingFilter(dropdown: Dropdown) {
    dropdown.resetFilter();
  }

  handleOnNextBackClick(newCurrentScreenCount: number) {
    this._currentScreen = newCurrentScreenCount;
    this._filterService.OnScreenChanged.next(newCurrentScreenCount);
  }

  handleOnFinishedClick(isFinished: boolean) {
    const serviceList: ServiceList = { AnswerID: [], IndexList: '', RecommendationID: [], ResponseID: [], ServiceType: '' };
    let indexListString: string = '';

    this._selectedFlightArray.forEach(selectedFlight => {
      serviceList.AnswerID.push(selectedFlight.AnswerID);
      indexListString += selectedFlight.RefNumber.toString() + ';';
      serviceList.RecommendationID.push(selectedFlight.RecommendationID);
      serviceList.ResponseID.push(selectedFlight.ResponseId);
    });

    indexListString = indexListString.slice(0, -1);
    serviceList.IndexList = indexListString;
    serviceList.ServiceType = 'Flight';

    const serviceListArray: ServiceList[] = [];
    serviceListArray.push(serviceList);

    this._obtService.postSelectedFlightResults(serviceListArray);
  }

  getCityNameByAirport(airportCode: string): string {
    return this.extandInfoService.getCityAndCountryByAirportCode(airportCode).CityName;
  }

}
