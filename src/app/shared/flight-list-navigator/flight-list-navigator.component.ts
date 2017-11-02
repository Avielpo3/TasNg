import { Component, OnInit, Output, EventEmitter, Input, ElementRef } from '@angular/core';
import { FlightSelectedEvent } from '../../obt/Dto & Enum/EventsDto/flight.event';
import { ObtService } from '../../services/obt.service';
import { WindowRefService } from '../../services/global services/window.service';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-flight-list-navigator',
  templateUrl: './flight-list-navigator.component.html',
  styleUrls: ['./flight-list-navigator.component.scss'],
})
export class FlightListNavigatorComponent implements OnInit {

  @Output() onNext: EventEmitter<number> = new EventEmitter();
  @Output() onFinished: EventEmitter<boolean> = new EventEmitter();
  @Output() onBack: EventEmitter<number> = new EventEmitter();

  @Input() iCurrentScreen: number = 0;
  @Input() iTotalScreenCount: number;
  @Input() iSelectedFlightArray: FlightSelectedEvent[] = [];

  private _flightResultRef: ElementRef;
  private _window;
  private timer;

  constructor(private _obtService: ObtService, private _windowService: WindowRefService) { }

  ngOnInit() {
    this._obtService.OnSelectedFlight.subscribe((elementRef: ElementRef) => {
      if (elementRef !== null) {
        this._flightResultRef = elementRef;
      }
    });

    this._window = this._windowService.nativeWindow;
  }

  triggerNext() {
    if (this.iCurrentScreen < this.iTotalScreenCount) {
      const newScreenCount = this.iCurrentScreen + 1;
      this.onNext.next(newScreenCount);
      console.log(newScreenCount);
    }
    if (this.iCurrentScreen === this.iTotalScreenCount) {
      this.onFinished.next(true);
    }
  }

  triggerBack() {
    if (0 < this.iCurrentScreen) {
      const newScreenCount = --this.iCurrentScreen;
      this.onBack.next(newScreenCount);
      console.log(newScreenCount);
    }
  }

  triggerScrollTo() {
    const offsetElementY: number = this._flightResultRef.nativeElement.offsetTop;
    const windowY: number = this._windowService.nativeWindow.pageYOffset;
    const step = Math.abs(windowY - offsetElementY) / 100;
    const isScrollUpOrDown = windowY - offsetElementY > 0;

    if (isScrollUpOrDown) {
      for (let i = windowY; i > offsetElementY; i = i - step) {
        setTimeout(() => {
          this._windowService.nativeWindow.scrollTo(0, i);
        }, 20);
      }
    } else {
      for (let i = windowY; i < offsetElementY; i = i + step) {
        setTimeout(() => {
          this._windowService.nativeWindow.scrollTo(0, i);
        }, 20);
      }
    }
  }


  getNextButtonTitle(): string {
    if (this.iCurrentScreen === this.iTotalScreenCount) {
      return 'Confirm';
    } else {
      return 'Next';
    }
  }

  showOrHideNextButton(): boolean {
    if (this.iSelectedFlightArray.length > 0) {
      return this.iSelectedFlightArray.some(fe => fe.ScreenNumber === this.iCurrentScreen && fe.IsSelected === true);
    }
  }
}
