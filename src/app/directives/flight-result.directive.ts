import {
  Directive,
  OnInit,
  Renderer2,
  ElementRef,
  HostListener,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  AfterViewInit,
  EventEmitter
} from '@angular/core';
import { ObtService } from '../services/obt.service';

@Directive({
  selector: '[appFlightResultSelected]'
})
export class FlightResultSelectedDirective implements OnInit, OnChanges {
  @Input() IsSelected: boolean;
  @Input() CurrentScreen: number;

  private readonly FlightSelectedClass = 'fligt-selected';
  private readonly FlightHoverClass = 'fligt-hover';

  /**
     * Creates an instance of FlightResultSelectedDirective.
     * Inject Renderer for styling and ElementRef to access element itself.
     * @param {Renderer2} _renderer
     * @param {ElementRef} _elementRef
     * @memberof FlightResultSelectedDirective
     */
  constructor(
    private _renderer: Renderer2,
    private _elementRef: ElementRef,
    private _obtService: ObtService
  ) {}

  ngOnInit(): void {
    if (this.IsSelected) {
      this._renderer.addClass(
        this._elementRef.nativeElement,
        this.FlightSelectedClass
      );
      this._obtService.OnSelectedFlight.next(this._elementRef);
    }
  }

  /**
     * Detect the changes, and change styles by method logic.
     * @param {SimpleChanges} changes
     * @returns void
     * @memberof FlightResultSelectedDirective
     */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes.IsSelected) {
      if (changes.IsSelected.firstChange) {
        return;
      }
      if (changes.IsSelected.currentValue) {
        this._renderer.addClass(
          this._elementRef.nativeElement,
          this.FlightSelectedClass
        );
        this._obtService.OnSelectedFlight.next(this._elementRef);
      } else {
        this._renderer.removeClass(
          this._elementRef.nativeElement,
          this.FlightSelectedClass
        );
        this._obtService.OnSelectedFlight.next(null);
      }
    }
  }

  /**
     * Listen to mouse Enter (Hover) Event.
     * @param {Event} event
     * @memberof FlightResultSelectedDirective
     */
  @HostListener('mouseenter')
  mouseEnter(event: Event) {
    this._renderer.addClass(
      this._elementRef.nativeElement,
      this.FlightHoverClass
    );
  }

  /**
     * Listen to mouse Leave Event.
     * @param {Event} event
     * @memberof FlightResultSelectedDirective
     */
  @HostListener('mouseleave')
  mouseLeave(event: Event) {
    this._renderer.removeClass(
      this._elementRef.nativeElement,
      this.FlightHoverClass
    );
  }
}
