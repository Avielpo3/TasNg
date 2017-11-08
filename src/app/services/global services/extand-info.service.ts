import { Injectable, EventEmitter } from '@angular/core';
import { ApiService } from '../api.service';
import { LoggerService } from '../logger.service';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { ItinerariesList } from '../../obt/Dto & Enum/Flight Dto/flight-result.dto';
import { ObtService } from '../obt.service';
import { AirportCodeToCityAndCountryName } from './../../obt/Dto & Enum/Airports Dto/airport-city-country.dto';
import { AirlineInfo } from '../../obt/Dto & Enum/Airline Dto/airline-names.dto';
import { CurrencyDto } from '../../obt/Dto & Enum/Currency Dto/currency.dto';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';


@Injectable()
export class ExtendInformationService {
    private _onJsonDataFinishedLoaded: ReplaySubject<boolean> = new ReplaySubject<boolean>();
    public get OnJsonDataFinishedLoaded(): ReplaySubject<boolean> {
        return this._onJsonDataFinishedLoaded;
    }

    private _airlineNameList: AirlineInfo[];
    public get AirlineNameList(): AirlineInfo[] {
        return this._airlineNameList;
    }

    private _airportToCityAndCountryNameList: AirportCodeToCityAndCountryName[];
    public get AirportToCityAndCountryNameList(): AirportCodeToCityAndCountryName[] {
        return this._airportToCityAndCountryNameList;
    }

    private _currencyConvertList: CurrencyDto[];
    public get CurrencyConverterList(): CurrencyDto[] {
        return this._currencyConvertList;
    }

    /**
     * Creates an instance of ExtendInformationService.
     * Do not load here Obt Service!
     * @param {ApiService} _apiService
     * @param {LoggerService} _logger
     * @memberof ExtendInformationService
     */
    constructor(private _apiService: ApiService,
        private _logger: LoggerService) {
        this.loadAllJsonFiles();
    }

    public getAirlineNameByCode(marketingAirline: string): string {
        return this.AirlineNameList
            .find(airport => airport.Code === marketingAirline).Name;
    }

    public getCurrencyRateByCurrencyCode(currencyCode: string): number {
        return this.CurrencyConverterList.find(convertor => convertor.ToCode === currencyCode).Exchange_Rate;
    }

    public getCityAndCountryByAirportCode(airportCode: string): AirportCodeToCityAndCountryName {
        return this.AirportToCityAndCountryNameList.find(info => info.AirportCode === airportCode);
    }


    /**
     * Load all JSON files,
     * Wait for all async data to start angular.
     * @private
     * @memberof ExtendInformationService
     */
    private loadAllJsonFiles(): void {
        Observable.combineLatest(
            this._apiService.getAirlineNameList(),
            this._apiService.getAirportCodeToCityAndCountryNameList(),
            this._apiService.getCurrencyConvertList(),
        ).subscribe(data => {
            this._airlineNameList = (data[0] as AirlineInfo[]);
            this._airportToCityAndCountryNameList = (data[1] as AirportCodeToCityAndCountryName[]);
            this._currencyConvertList = (data[2] as CurrencyDto[]);
            const isAllDataFinishedToLoad: boolean = true;
            this.OnJsonDataFinishedLoaded.next(isAllDataFinishedToLoad);
        });
    }

}
