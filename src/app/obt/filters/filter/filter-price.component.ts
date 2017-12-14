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

  _minValue: number;
  _maxValue: number;

  ngOnInit() {
    // Initalize value for filter.
    this.subcribeToScreenChangeEvent();
    this._minValue = Math.floor(this._userService.UserExchangeRate * this._filter.ngPrimeOptions.min[0]);
    this._maxValue = Math.ceil(this._userService.UserExchangeRate * this._filter.ngPrimeOptions.max[0]);
    this.rangeValues = [this._minValue, this._maxValue];
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

    //  Listen to Dom 'change' event,and send the data to the service.
    handleChange(event) {
      const minBegin = event.values[0] - this._minValue;
      const minMoved = minBegin * 100 /  this._maxValue;

      const maxBegin = event.values[1] - this._minValue;
      const maxMoved = maxBegin * 100 /  this._maxValue;

      if (Math.abs(minMoved - maxMoved) >= 14) {
        this._maxMoved = (maxMoved <= 83) ? maxMoved.toString() + '%' : '83%';
        this._minMoved = minMoved.toString() + '%';
      }
    }

  private subcribeToScreenChangeEvent(): void {
    this._filterService.OnScreenChanged.subscribe((currentScreen: number) => {
      this._minValue = this._filter.ngPrimeOptions.min[currentScreen];
      this._maxValue = this._filter.ngPrimeOptions.max[currentScreen];
      this.rangeValues = [this._filter.ngPrimeOptions.min[currentScreen], this._filter.ngPrimeOptions.max[currentScreen]];
    });
  }

}
