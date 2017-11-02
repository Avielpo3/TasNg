import { Pipe, PipeTransform } from '@angular/core';
import { UserService } from '../services/user.service';

@Pipe({
    name: 'userCurrncy',
})
export class UserCurrencyPipe implements PipeTransform {

    /**
     * For injection.
     */
    constructor(private _userService: UserService) { }

    transform(currencyAmount: number): string {
        const amount = (currencyAmount * this._userService.UserExchangeRate).toFixed(2);

        return amount;
    }

}
