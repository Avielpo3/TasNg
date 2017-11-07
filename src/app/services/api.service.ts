import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { environment } from '../../environments/environment';

import 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { LoggerService } from './logger.service';
import { ServiceList } from '../obt/Dto & Enum/service-list.dto';

@Injectable()
export class ApiService {
  private readonly FlightResultUrl: string = environment.flightResultJsonUrl;
  private readonly AirlineCodeToCityNameUrl: string = environment.AirlineCodeToCityNameUrl;
  private readonly AirlineNameListUrl: string = environment.AirlineNameListUrl;
  private readonly CurrencyConvertListUrl: string = environment.CurrencyConvertListUrl;
  private readonly AirportListOnDemandUrl: string = environment.AirportListOnDemandUrl;

  private requestOptions = new RequestOptions();

  constructor(private _http: Http, private _logger: LoggerService) {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json; charset=UTF-8');
    headers.append('Accept', 'application/json, text/javascript, */*; q=0.01');
    headers.append('Access-Control-Allow-Origin', '*');
    headers.append('Access-Control-Allow-Methods', 'POST, GET, OPTIONS, PUT, DELETE, HEAD');
    headers.append('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept');
    headers.append('Access-Control-Max-Age', '1728000');
    this.requestOptions.headers = headers;
  }

  getRequestId() {
    const url = 'TasAngular.aspx/GetRequestId';
    const data = JSON.stringify({ 'stamData': true });

    return this._http.post(url, data, this.requestOptions)
      .map(
      (response: Response) => {
        try {
          const responseRequestIdJson = response.json();
          const requestId = JSON.parse(responseRequestIdJson.d);
          this._logger.logInfo(requestId);

          // Success
          return requestId;
        } catch (error) {
          // Error while parsing.
          this._logger.onException((<Error>error));
          throw new Error('Error while parsing the Request id');
        }
      }
      ).catch(
      // Http Request error.
      (err: Response) => Observable.throw('Http Error while try to get Request Id'));
  }


  public getAirportListByDemand(airportName): any {
    const url = 'http://localhost:4909/Tas.Web/ETS/SearchForServices/tas-angular/Controllers/ApiController.asmx/GetAirportListOnDemand';
    const data = JSON.stringify({ 'searchForAirport': airportName });

    return this._http.post(url, data, this.requestOptions)
      .map(
      (response: Response) => {
        try {
          const airportList = response.json();
          this._logger.logInfo(airportList);
          // Success
          return airportList;
        } catch (error) {
          // Error while parsing.
          this._logger.onException((<Error>error));
        }
      }).catch(
      // Http Request error.
      (err: Response) => this.handleError(err));
  }

  getFlightResults(requestId: number) {
    const url = '../../tas-angular/Controllers/ApiController.asmx/CheckResponse';
    const data = JSON.stringify({ 'requestId': requestId });

    return this._http.post(url, data, this.requestOptions)
      .map((flightResponse: Response) => {
        try {
          const responseFlightResultsJson = flightResponse.json();
          const flightsReults = JSON.parse(responseFlightResultsJson.d);
          this._logger.logInfo(flightsReults);

          return flightsReults;
        } catch (error) {
          this._logger.onException((<Error>error));
        }
      }).catch(
      // Http Request error.
      (err: Response) => this.handleError(err));
  }

  public postSelectedFlightResults(serviceList: ServiceList[]) {
    const url = '../../tas-angular/Controllers/ApiController.asmx/SaveSelectedServices';
    const serviceListJson = JSON.stringify(serviceList);
    const flightResultData = JSON.stringify({ 'flightResultData': serviceListJson });

    return this._http.post(url, flightResultData, this.requestOptions)
      .map((response: Response) => {
        try {
          return response;
        } catch (error) {
          this._logger.onException((<Error>error));
          throw new Error('Error while Posting flight selected results');
        }
      }).catch(
      // Http Request error.
      (err: Response) => this.handleError(err));
  }

  getMockFlightResults() {
    return this._http.get(this.FlightResultUrl)
      .map((resposnse: Response) => {
        try {
          return resposnse;
        } catch (error) {
          this._logger.onException(error);
        }
      }).catch(
      // Http Request error.
      (err: Response) => this.handleError(err));
  }

  getAirlineNameList() {
    return this._http.get(this.AirlineNameListUrl)
      .map((resposnse: Response) => {
        try {
          return resposnse.json();
        } catch (error) {
          this._logger.onException(error);
        }
      });
  }

  getCurrencyConvertList() {
    return this._http.get(this.CurrencyConvertListUrl)
      .map((resposnse: Response) => {
        try {
          return resposnse.json();
        } catch (error) {
          this._logger.onException(error);
        }
      });
  }

  getMockAirportOnDemand() {
    return this._http.get('assets/mockAirportResults.json')
      .map((resposnse: Response) => {
        try {
          return resposnse.json();
        } catch (error) {
          this._logger.onException(error);
        }
      });
  }

  /**
   *  Load a json with this parameters:
   * AirportID, CityID, CityName, AirportCode, AirportName, CountryName, CountryCode, RecommendText, ExistsAirports
   * @returns {Observable<Response>}
   * @memberof ApiService
   */
  public getAirportCodeToCityAndCountryNameList() {
    return this._http.get(this.AirlineCodeToCityNameUrl)
      .map((resposnse: Response) => {
        try {
          return resposnse.json();
        } catch (error) {
          this._logger.onException(error);
        }
      });
  }

  private handleError(error: Response) {
    return Observable.throw(error.json().error || 'Server error');
  }

}
