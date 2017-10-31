import { Component, OnInit, Input, ViewEncapsulation, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-policy-slider',
  templateUrl: './policy-slider.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./policy-slider.component.scss']
})
export class PolicySliderComponent implements OnInit {

  /**
   * Set to true to display only the value without the handle
   * @type {boolean}
   */
  @Input() disabled: boolean = false;

  /**
   * Set the policy level
   * @type {number}
   */
  @Input() level: number = 3;

  // tslint:disable-next-line:no-output-rename
  @Output('changed') levelChanged: EventEmitter<number> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {

  }

  updateLevel(event) {
    this.levelChanged.next(event.value);
  }

}
