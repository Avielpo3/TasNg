import { LoggerService } from '../../../services/logger.service';
import * as console from 'console';
import { Observable } from 'rxjs/Rx';
import { Component, Input, OnInit, ViewChild, EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { FilterService } from '../../../services/filter.service';
import { Subscription } from 'rxjs/Subscription';
import { FilterNameEnum } from '../../Dto & Enum/filter-name-enum';
import { ObtService } from '../../../services/obt.service';
import { FlightGlobalInfo } from '../../Dto & Enum/flights-global-info';
import { FilterDto } from '../../Dto & Enum/filter-dto';
import { FilterEvent } from '../../Dto & Enum/EventsDto/filter.event';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() _filter: FilterDto;
  @Input() _index: number;
  @Input() _userCurrency: number;

  private _onChangeSubscription = new Subscription();
  @ViewChild('ngPrimeSlider') ngPrimeSlider: ElementRef;

  _minMoved: string = '0%';
  _maxMoved: string = '83%';
  private rangePercventage: number;

  rangeValues: number[];

  /**
   * Creates an instance of FilterComponent.
   * @param {FilterService} _filterService
   * @param {ObtService} _obtService
   * @memberof FilterComponent
   */
  constructor(
    protected _filterService: FilterService,
    private _obtService: ObtService,
    protected _userService: UserService,
    private _logger: LoggerService) { }

  ngOnInit() {
    // Initalize value for filter.
    this.rangeValues = [this._filter.ngPrimeOptions.min[0], this._filter.ngPrimeOptions.max[0]];
  }

  //  Listen to Dom 'change' event,and send the data to the service.
  handleChange(event) {
    const minBegin = event.values[0] - this._filter.ngPrimeOptions.min[0];
    const minMoved = minBegin * 100 / this._filter.ngPrimeOptions.max[0];

    const maxBegin = event.values[1] - this._filter.ngPrimeOptions.min[0];
    const maxMoved = maxBegin * 100 / this._filter.ngPrimeOptions.max[0];

    if (Math.abs(minMoved - maxMoved) >= 14) {
      this._maxMoved = (maxMoved <= 83) ? maxMoved.toString() + '%' : '83%';
      this._minMoved = minMoved.toString() + '%';
    }
  }

  /**
   * Listen to Slider Dom 'Stop' event, and send the FilterEvent to the service.
   * @param {any} event
   * @memberof FilterComponent
   */
  handleSlideStop(event) {
    if (event.values && this._filter.ngPrimeOptions.range) {
      const filterEvent: FilterEvent = { sender: this._filter.name, values: { min: event.values[0], max: event.values[1] } };
      this._filterService.OnSliderFilterChangeValue.next(filterEvent);
    }
  }


  getFilterName(filterIndex): string {
    return FilterNameEnum[filterIndex];
  }
}
