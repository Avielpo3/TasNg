import { Injectable, EventEmitter } from '@angular/core';
import { PrimeNgPopup } from '../obt/Dto & Enum/PrimeNgDto/Popup.dto';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppService {
  _popup: PrimeNgPopup = { header: 'Error', content: '', appendTo: 'body', isBackgrondBlocked: true, visible: false };

  /**
   * Inject the services.
   */
  constructor(private _translateService: TranslateService) {

  }

  private _onAngularStarted = new EventEmitter<boolean>();
  public get OnAngularStarted(): EventEmitter<boolean> {
    return this._onAngularStarted;
  }

  private _onShowPopup = new EventEmitter<PrimeNgPopup>();
  public get OnShowPopup(): EventEmitter<PrimeNgPopup> {
    return this._onShowPopup;
  }

  public StartAngular(): void {
    const startAngular: boolean = true;
    this.OnAngularStarted.next(startAngular);
  }

  /**
   * Call this method to show pop-up all over the screen.
   * The content will be translate (if exsists).
   * @param {string} content
   * @param {string} header
   * @param {boolean} visible
   * @param {boolean} [isBackgrondBlocked=true]
   * @param {string} [appendTo='body']
   * @memberof AppService
   */
  public showPopup(content: string, header: string, visible: boolean, isBackgrondBlocked = true, appendTo = 'body'): void {
    Observable.combineLatest(
      this._translateService.get(content).map(translatedcontent => translatedcontent),
      this._translateService.get(header).map(translatedheader => translatedheader)
    ).subscribe(
      translatedValues => {
        this._popup.content = translatedValues[0];
        this._popup.header = translatedValues[0];
        this._popup.isBackgrondBlocked = isBackgrondBlocked;
        this._popup.appendTo = appendTo;
        this._popup.visible = visible;

        this.OnShowPopup.next(this._popup);
      });
  }
}
