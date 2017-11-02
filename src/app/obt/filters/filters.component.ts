import { Component, OnInit } from '@angular/core';
import { FilterDto } from '../Dto & Enum/filter-dto';
import { FilterNameEnum } from '../Dto & Enum/filter-name-enum';
import { FilterService } from '../../services/filter.service';
import { ObtService } from '../../services/obt.service';
import { FlightGlobalInfo } from '../Dto & Enum/flights-global-info';
import { LoggerService } from '../../services/logger.service';
import { AirlineInfo } from '../Dto & Enum/airline-name-dto';


@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  style1 = {display: 'block'};

  _filterSliderList: FilterDto[];
  _filterStopQuantityList: number[];
  _filterAirlineList: AirlineInfo[];
  _selectedStopQuantityFilter: number[];
  _selectedAirlineFilter: AirlineInfo[];

  constructor(private _filterService: FilterService, private _obtService: ObtService, private _loggerService: LoggerService) {
    this.getFiltersList();
    this.subscribeToGlobalFlightInfo();
  }

  ngOnInit() {

  }

  private subscribeToGlobalFlightInfo(): void {
    this._obtService.onGetFlightGlobalInfo.subscribe(
      (flightGlobalInfo: FlightGlobalInfo) => {
        this._filterSliderList[0].ngPrimeOptions.min = flightGlobalInfo.FlightMinPrice;
        this._filterSliderList[0].ngPrimeOptions.max = flightGlobalInfo.FlightMaxPrice;
        this._selectedStopQuantityFilter = this._filterStopQuantityList = flightGlobalInfo.StopQuantity;
        this._selectedAirlineFilter = this._filterAirlineList = flightGlobalInfo.Airlines;
        this._filterService.OnStopQuantityFilterToggle.next(this._selectedStopQuantityFilter);
        this._filterService.OnAirlineFilterToggle.next(this._selectedAirlineFilter);
      });
  }

  /**
   * When toggle the stop quantity, Emitting the new stop quantity array.
   * @param {*} checkboxEvent
   * @memberof FiltersComponent
   */
  handleStopsQuantityFilterChange(checkboxEvent: any) {
    this._filterService.OnStopQuantityFilterToggle.next(this._selectedStopQuantityFilter);
  }

  handleAirlineFilterChange(checkboxEvent: any) {
    this._filterService.OnAirlineFilterToggle.next(this._selectedAirlineFilter);
    this._loggerService.logObject(this._filterAirlineList);
  }

  private getFiltersList(): void {
    this._filterSliderList = this._filterService.FilterList;
  }

  getStopQuantityFilterName(filterNumber: number): string {
    switch (filterNumber) {
      case 0:
        return 'Direct';
      case 1:
        return '1 Stop';
      default:
        return filterNumber.toString() + ' Stops';
    }
  }

}
