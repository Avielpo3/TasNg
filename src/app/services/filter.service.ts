import { Injectable, ElementRef, EventEmitter } from '@angular/core';
import { FilterNameEnum } from '../obt/Dto & Enum/filter-name-enum';
import { Subject } from 'rxjs/Subject';
import { FilterEvent } from '../obt/Dto & Enum/EventsDto/filter.event';
import { FilterDto } from '../obt/Dto & Enum/filter-dto';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { AirlineInfo } from '../obt/Dto & Enum/airline-name-dto';
import { ObtService } from './obt.service';

@Injectable()
export class FilterService {

  public OnSliderFilterChangeValue: Subject<FilterEvent> = new Subject();
  public OnStopQuantityFilterToggle: ReplaySubject<number[]> = new ReplaySubject();

  /* On Filter click one og the airlines brands */
  private onAirlineFilterToggle: ReplaySubject<AirlineInfo[]> = new ReplaySubject();
  public get OnAirlineFilterToggle(): ReplaySubject<AirlineInfo[]> {
    return this.onAirlineFilterToggle;
  }

  /* On Filter click Show result out of policy */
  private onShowResultsOutOfPolicyEmitter: EventEmitter<boolean> = new EventEmitter();
  public get OnShowResultsOutOfPolicyToggle(): EventEmitter<boolean> {
    return this.onShowResultsOutOfPolicyEmitter;
  }

  /* On Filter 'Slide' the policy level */
  private onPolicyLevelChanged: EventEmitter<number> = new EventEmitter();
  public get OnPolicyLevelChanged(): EventEmitter<number> {
    return this.onPolicyLevelChanged;
  }

  /* On Screen changed, Next or back button */
  private onScreenChanged: EventEmitter<number> = new EventEmitter();
  public get OnScreenChanged(): EventEmitter<number> {
    return this.onScreenChanged;
  }

  private _filterArray: FilterDto[] = [
    {
      name: FilterNameEnum.Price,
      isVisible: true,
      ngPrimeOptions: {
        animate: true,
        min: [0],
        max: [10000],
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
          min: [0],
          max: [23],
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
          min: [0],
          max: [23],
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
}
