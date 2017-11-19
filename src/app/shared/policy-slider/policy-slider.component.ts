import {
  Component,
  OnInit,
  Input,
  ViewEncapsulation,
  EventEmitter,
  Output
} from '@angular/core';

@Component({
  selector: 'app-policy-slider',
  templateUrl: './policy-slider.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./policy-slider.component.scss']
})
export class PolicySliderComponent implements OnInit {
  /**
   * Set the policy level
   * @type {number}
   */
  @Input() _currentPolicy: number = 0;

  /**
   * On policy level changed.
   * @type {EventEmitter<number>}
   * @memberof PolicySliderComponent
   */
  @Output() onPolicyChanged: EventEmitter<number> = new EventEmitter();

  /**
 * Creates an instance of PolicySliderComponent.
 * @memberof PolicySliderComponent
 */
  constructor() {}

  ngOnInit() {}

  updateLevel(policyLevel: number) {
    this._currentPolicy = policyLevel;
    this.onPolicyChanged.next(policyLevel);
  }
}
