import { Injectable } from '@angular/core';
import { UserInformation } from '../obt/Dto & Enum/user-settings.dto';
import { ExtendInformationService } from './global services/extand-info.service';

@Injectable()
export class UserService {


  private _userInformation: UserInformation;
  public get UserInformation(): UserInformation {
    return this._userInformation;
  }

  private _userExchangeRate: number;
  public get UserExchangeRate(): number {
    return this._userExchangeRate;
  }
  public set UserExchangeRate(exchangeRate: number) {
    this._userExchangeRate = exchangeRate;
  }


  /**
   * Creates an instance of UserService.
   * @memberof UserService
   */
  constructor(private _extandInformation: ExtendInformationService) {
  }

  /**
   * Initalize the user information when app start's.
   * @param {UserInformation} userInformation
   * @memberof UserService
   */
  public initalizeUserInformation(userInformation: UserInformation): void {
    this._userInformation = userInformation;
    this.saveCurrentExchangeRate(userInformation.CurrencyCode);
  }

  private saveCurrentExchangeRate(currencyCode: string): void {
    if (currencyCode === 'USD') {
      this._userExchangeRate = 1;
      return;
    }
    this._userExchangeRate = this._extandInformation.getCurrencyRateByCurrencyCode(currencyCode);
  }
}
