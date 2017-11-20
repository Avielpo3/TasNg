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
 * Check box that indicates if the user can see results out of policy
 * @type {boolean}
 * @memberof PolicySliderComponent
 */
  @Input() _showResultsOutOfPolicy: boolean = true;

  /**
   * On policy level changed.
   * @type {EventEmitter<number>}
   * @memberof PolicySliderComponent
   */
  @Output() onPolicyLevelChanged: EventEmitter<number> = new EventEmitter();

  /**
 * Event that fires when check/unchecked the Show results out of policy.
 * @type {EventEmitter<boolean>}
 * @memberof PolicySliderComponent
 */
  @Output() onShowResultsOutOfPolicyEmitter: EventEmitter<boolean> = new EventEmitter();

  /**
 * Creates an instance of PolicySliderComponent.
 * @memberof PolicySliderComponent
 */
  constructor() {}

  ngOnInit() {}

  updateLevel(policyLevel: number) {
    this._currentPolicy = policyLevel;
    this.onPolicyLevelChanged.next(policyLevel);
  }

  onShowResultsOutOfPolicyChanged(event) {
    this.onShowResultsOutOfPolicyEmitter.next(this._showResultsOutOfPolicy);
  }
}
