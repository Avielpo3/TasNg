import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { FilterNameEnum } from '../obt/Dto & Enum/filter-name-enum';
import { Subject } from 'rxjs/Subject';
import { FilterEvent } from '../obt/Dto & Enum/EventsDto/filter.event';
import { FilterDto } from '../obt/Dto & Enum/filter-dto';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AirlineInfo } from '../obt/Dto & Enum/airline-name-dto';

@Injectable()
export class FilterService {

  public OnSliderFilterChangeValue: Subject<FilterEvent> = new Subject();
  public OnStopQuantityFilterToggle: ReplaySubject<number[]> = new ReplaySubject();
  public OnAirlineFilterToggle: ReplaySubject<AirlineInfo[]> = new ReplaySubject();

  private _filterArray: FilterDto[] = [
    {
      name: FilterNameEnum.Price,
      isVisible: true,
      ngPrimeOptions: {
        animate: true,
        min: 0,
        max: 10000,
        disabled: false,
        orientation: 'horizontal',
        range: true,
        step: 1,
        style: null,
        styleClass: null
      }
    },
    {
      name: FilterNameEnum.DepartueHour,
      isVisible: true,
      ngPrimeOptions:
      {
        animate: true,
        min: 0,
        max: 23,
        disabled: false,
        orientation: 'horizontal',
        range: true,
        step: 0.5,
        style: null,
        styleClass: null
      }
    },
    {
      name: FilterNameEnum.ArrivelHour,
      isVisible: true,
      ngPrimeOptions:
      {
        animate: true,
        min: 0,
        max: 23,
        disabled: false,
        orientation: 'horizontal',
        range: true,
        step: 0.5,
        style: null,
        styleClass: null
      }
    }
  ];

  public get FilterList(): FilterDto[] {
    return this._filterArray;
  }

  constructor() {
  }

}
