import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';

@Injectable()
export class SearchForServicesService {


    private _fromAirportKeyUpSubject = new Subject<any>();
    public get OnFromAirportKeyUpSubject(): Subject<any> {
        return this._fromAirportKeyUpSubject;
    }

    private _kuyUpSubscription: Subscription;
    public get KuyUpSubscription(): Subscription {
        return this._kuyUpSubscription;
    }

    public set KuyUpSubscription(subscription: Subscription) {
        this._kuyUpSubscription = subscription;
    }


    /**
     * Search for services C'tor
     */
    constructor() {
    }
}
