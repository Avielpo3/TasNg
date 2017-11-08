import { Component, OnInit, ElementRef, ViewChild, OnDestroy, Renderer2, Output, EventEmitter, Input } from '@angular/core';
import { ExtendInformationService } from '../../services/global services/extand-info.service';
import { Observable } from 'rxjs/Observable';
import { AirportByName } from '../../obt/Dto & Enum/Airports Dto/airport-from-db.dto';
import { LoggerService } from '../../services/logger.service';
import { TextOnDemandService } from './text-on-demand.service';

@Component({
  selector: 'app-text-on-demand',
  templateUrl: './text-on-demand.component.html',
  styleUrls: ['./text-on-demand.component.scss']
})
export class TextOnDemandComponent implements OnInit, OnDestroy {

  @ViewChild('textOnDemandInput') textOnDemandInput: ElementRef;
  @ViewChild('textOnDemandList') textOnDemandList: ElementRef;
  @ViewChild('textOnDemandListContainer') textOnDemandListContainer: ElementRef;

  @Input() placeholder: string = '';

  @Output() selectedValue = new EventEmitter<AirportByName>();


  _airportList: AirportByName[] = [];
  _textOnDemandListDisplay: boolean = true;
  _selectedAirport: AirportByName;

  constructor(private _logger: LoggerService,
    private _onDemandService: TextOnDemandService,
    private _renderer: Renderer2
  ) { }

  ngOnInit(): void {
    this.subscribeOnKepUpEvent();
  }

  setSelectedAirport(airport: AirportByName): void {
    this._selectedAirport = airport;
    this.selectedValue.next(airport);
    this._textOnDemandListDisplay = true;
  }

  onBlur(event) {
    setTimeout(() => this._textOnDemandListDisplay = true, 100);
  }

  private subscribeOnKepUpEvent(): void {
    this._onDemandService.KeyUpSubscription =
      Observable.fromEvent(this.textOnDemandInput.nativeElement, 'keyup')
        .pluck('target', 'value')
        .debounceTime(1000)
        .distinctUntilChanged()
        .filter((val: string) => val.length > 2)
        .mergeMap((value: string) => this._onDemandService.getAirportListByDemand(value))
        .subscribe((airportList: AirportByName[]) => {
          try {
            this._airportList = airportList;
          } catch (error) {
            this._logger.onError(error);
          }
        });
  }

  ngOnDestroy(): void {
    this._onDemandService.KeyUpSubscription.unsubscribe();
  }
}
