import { Component, OnInit } from '@angular/core';
import { FilterComponent } from './filter.component';
import { FilterEvent } from '../../Dto & Enum/EventsDto/filter.event';


/**
 * The logic is inside FilterComponent
 * The style is the same as filter.component.scss
 * @export
 * @class FilterPriceComponent
 * @extends {FilterComponent}
 * @implements {OnInit}
 */
@Component({
  selector: 'app-filter-price',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterPriceComponent extends FilterComponent implements OnInit {

  ngOnInit() {
    // Initalize value for filter.
    this._filter.ngPrimeOptions.min = Math.floor(this._userService.UserExchangeRate * this._filter.ngPrimeOptions.min);
    this._filter.ngPrimeOptions.max = Math.ceil(this._userService.UserExchangeRate * this._filter.ngPrimeOptions.max);
    this.rangeValues = [this._filter.ngPrimeOptions.min, this._filter.ngPrimeOptions.max];
  }


  handleSlideStop(event) {
    if (event.values && this._filter.ngPrimeOptions.range) {
      const filterEvent: FilterEvent = {
        sender: this._filter.name, values: {
          min: event.values[0] / this._userService.UserExchangeRate,
          max: event.values[1] / this._userService.UserExchangeRate
        }
      };
      this._filterService.OnSliderFilterChangeValue.next(filterEvent);
    }
  }

}
