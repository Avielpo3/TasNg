import { Component, OnInit, HostListener } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Response } from '@angular/Http';
import { LoggerService } from './services/logger.service';
import { ApiService } from './services/api.service';
import { TranslateLanguges } from './obt/Dto & Enum/translate-enum';
import { EnumUtils } from './Utils/enum-utils';
import { ObtService } from './services/obt.service';
import { UserInformation } from './obt/Dto & Enum/user-settings.dto';
import { UserService } from './services/user.service';
import { AppService } from './services/app.service';
import { PrimeNgPopup } from './obt/Dto & Enum/PrimeNgDto/Popup.dto';
import { ExtendInformationService } from './services/global services/extand-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  _tasSupportedLanguages: string[];
  _isResultsArrived: boolean = false;
  requestId: string;
  _popup: PrimeNgPopup = { header: 'Error', content: '', appendTo: 'body', isBackgrondBlocked: true, visible: false };

  private _hostListenerEvent;
  private _isHostListenerArrived: boolean = false;
  private _isAngularFinishedLoadedJsonFiles: boolean = false;

  constructor(
    private _apiService: ApiService,
    private _logger: LoggerService,
    private _translateService: TranslateService,
    private _obtService: ObtService,
    private _userService: UserService,
    private _appService: AppService,
    private _extendInfo: ExtendInformationService) {
    _translateService.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.subscribeToJsonFinishedLoadedFiles();
    this.subscribeToAngularStartFinish();
    this.subscribeToPopupEvent();
  }

  /**
   * Set the user current language.
   * By the API.
   * @private
   * @returns {void}
   * @memberof AppComponent
   */
  private setUserLanguage(): void {
    const currentUserLang = this._userService.UserInformation.LanguageCode.toLowerCase();

    this._tasSupportedLanguages = EnumUtils.getAllEnumMembers(TranslateLanguges);
    const isLangSupported: boolean = this._tasSupportedLanguages.some(lang => lang === currentUserLang);

    if (!isLangSupported) {
      return;
    } else {
      if (currentUserLang !== 'en') {
        this._translateService.use(currentUserLang);
      }
    }
  }

  /**
   * For drop down future use.
   * @param {string} language
   * @memberof AppComponent
   */
  switchLanguage(language: string) {
    this._translateService.use(language);
  }

  /**
   * Listen to window global property from outside angular.
   * 'isAngularStarted' - the property name, 'event.detail' - the new value.
   * @param {any} event
   * @memberof AppComponent
   */
  @HostListener('window:isAngularStarted', ['$event'])
  initalizeAppListener(event) {
    this._hostListenerEvent = event;
    this._isHostListenerArrived = true;
    this.showResultsIfReady();
  }

  /**
   * Subscribe to JSON files ended to load.
   * Handle the Finished loaded json event.
   * @private
   * @memberof AppComponent
   */
  private subscribeToJsonFinishedLoadedFiles(): void {
    this._extendInfo.OnJsonDataFinishedLoaded.subscribe(isLoaded => {
      if (isLoaded) {
        this._isAngularFinishedLoadedJsonFiles = true;
        this.showResultsIfReady();
      }
    });
  }

  private showResultsIfReady(): void {
    if (this._isHostListenerArrived && this._isAngularFinishedLoadedJsonFiles) {
      this._isResultsArrived = this._hostListenerEvent.detail.detail;
      /// this._appService.OnAngularStarted.next(this._isResultsArrived);

      // Create info for user.
      const userInfo: UserInformation = {
        LanguageCode: this._hostListenerEvent.detail.language,
        CurrencyCode: this._hostListenerEvent.detail.currency,
        UserRequestId: this._hostListenerEvent.detail.requestId
      };
      this._userService.initalizeUserInformation(userInfo);
      this.setUserLanguage();
      this._obtService.setRequestIdAndStartNgProccess(this._hostListenerEvent.detail.requestId);
    }
  }

  /**
   * Listen to Angular start or finish event.
   * @private
   * @memberof AppComponent
   */
  private subscribeToAngularStartFinish(): void {
    this._appService.OnAngularStarted.subscribe((isResultsArrived: boolean) => {
      if (isResultsArrived) {
        this._isResultsArrived = isResultsArrived;
      }
    });
  }

  /**
   * Listen to popup event, Show pop or hide it,
   * @private
   * @memberof AppComponent
   */
  private subscribeToPopupEvent(): void {
    this._appService.OnShowPopup.subscribe((popup: PrimeNgPopup) => {
      this._popup = popup;
    });
  }
}
