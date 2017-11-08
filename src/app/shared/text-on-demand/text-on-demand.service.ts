import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class TextOnDemandService {

    private _fromAirportKeyUpSubject = new Subject<any>();
    public get OnFromAirportKeyUpSubject(): Subject<any> {
        return this._fromAirportKeyUpSubject;
    }

    private _keyUpSubscription: Subscription;
    public get KeyUpSubscription(): Subscription {
        return this._keyUpSubscription;
    }

    public set KeyUpSubscription(subscription: Subscription) {
        this._keyUpSubscription = subscription;
    }

    constructor(private _apiService: ApiService) {

    }

    public getAirportListByDemand(airportName: string): any {
        // return this._apiService.getAirportListByDemand(airportName);
        return this._apiService.getMockAirportOnDemand();
    }

}
