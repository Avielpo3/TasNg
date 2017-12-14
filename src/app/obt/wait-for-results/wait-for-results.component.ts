import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { ExtendInformationService } from '../../services/global services/extand-info.service';
@Component({
  selector: 'app-wait-for-results',
  templateUrl: './wait-for-results.component.html',
  styleUrls: ['./wait-for-results.component.css']
})
export class WaitForResultsComponent implements OnInit {

  constructor(private _extendinfo: ExtendInformationService) { }

  ngOnInit() {
    // if (!environment.production) {
    setTimeout(() => {
      this.startAngular();
    }, 1 * 1000);
    // }
  }

  startAngular() {
    const detail = {
      requestId: 122,
      detail: true,
      language: 'en',
      currency: 'TRY'
    };

    const event = document.createEvent('CustomEvent');
    event.initCustomEvent('isAngularStarted', false, true , detail);
    window.dispatchEvent(event);
  }

}
