import { Injectable, EventEmitter, ElementRef } from '@angular/core';
import { ApiService } from './api.service';
import { LoggerService } from './logger.service';
import { Response } from '@angular/http';
import { Subject } from 'rxjs/Subject';
import { FilterService } from './filter.service';
import { FlightGlobalInfo } from '../obt/Dto & Enum/flights-global-info';
import { FlightResultDto, ItinerariesList, FlightResponseFromServer } from '../obt/Dto & Enum/flight-result-dto';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { FlightSelectedEvent, CurrentFlightInfo } from '../obt/Dto & Enum/EventsDto/flight.event';
import { AirlineInfo } from '../obt/Dto & Enum/airline-name-dto';
import { AirportCodeToCityAndCountryName } from '../obt/Dto & Enum/airport-city-country-dto';
import { ExtendInformationService } from './global services/extand-info.service';
import { Observable } from 'rxjs/Observable';
import { ServiceList } from '../obt/Dto & Enum/service-list.dto';
import { AppService } from './app.service';
import { environment } from '../../environments/environment';
import * as $ from 'jquery';

@Injectable()
export class ObtService {
  private _isFirstJson: boolean = true;
  private _requstId: number;

  // Interval
  private _callToResultsIntervalTime: number = 2000; // 2 sec.
  private timer: Observable<number>;
  private isResultsArrived: boolean = true;

  private _flightGlobalInfo: FlightGlobalInfo = {
    Airlines: [],
    FlightMaxPrice: 0,
    FlightMinPrice: 999999,
    TotalFlightNumber: [],
    StopQuantity: [],
    DepartureDate: null,
    DepartueAirport: '',
    ArrivelAirport: '',
    ArrivelDate: null
  };

  private _flightResultList: FlightResultDto;
  public get FlightResultList(): FlightResultDto {
    return this._flightResultList;
  }

  // Events.
  public onGetFlightResultsJson = new Subject<FlightResultDto>();
  public onGetFlightGlobalInfo = new ReplaySubject<FlightGlobalInfo>();

  private _onSelectedFlight = new EventEmitter<ElementRef>();
  public get OnSelectedFlight(): EventEmitter<ElementRef> {
    return this._onSelectedFlight;
  }

  constructor(
    private _apiService: ApiService,
    private _logger: LoggerService,
    private _filterService: FilterService,
    private _extandInfoService: ExtendInformationService,
    private _appService: AppService) {
  }

  public setRequestIdAndStartNgProccess(requstId: number): void {
    this._requstId = requstId;
    this.isResultsArrived = true;
    this.timer = Observable.timer(0, this._callToResultsIntervalTime);

    this.timer
      .takeWhile(() => this.isResultsArrived)
      .subscribe(() => {
        // if (!environment.production) {
        //   this.getMockFlightResults();
        // } else {
        this.getFlightsResultFromApi();
        // }
      });
  }

  /**
   * Get the results from the server.
   * @returns {boolean}
   * @memberof ObtService
   */
  public getFlightsResultFromApi(): boolean {
    this._apiService.getFlightResults(this._requstId)
      .subscribe(
      (response: any) => {
        const jsonResponseArray = response.Table;
        if (jsonResponseArray.length === 0) {
          return true;
        }
        jsonResponseArray.forEach(jsonAnswer => {
          const flightResponse: FlightResponseFromServer = jsonAnswer as FlightResponseFromServer;
          try {
            if (flightResponse.ErrorDescriptionIfExist === null || flightResponse.ErrorDescriptionIfExist.length >= 1) {
              this._appService.showPopup(flightResponse.ErrorDescriptionIfExist, 'Error', true);
              this._logger.logObject(flightResponse.ErrorDescriptionIfExist);
              this.isResultsArrived = false;
            }

            if (flightResponse.AnswerResponseJson === null || flightResponse.AnswerResponseJson === '') {
              if (flightResponse.RemainingRequestCount <= 0) {
                this.isResultsArrived = false; // Stop quastion the api server.
              } else {
                return true;
              }
            }

            if (flightResponse.RemainingRequestCount === 0) {
              this.isResultsArrived = false; // Stop quastion the api server.
            }

            const responseId = flightResponse.CurrentResponseId;
            const flightResponseFullObject = JSON.parse(flightResponse.AnswerResponseJson);

            const flightResultDto: FlightResultDto = this._flightResultList = (flightResponseFullObject as FlightResultDto);
            if (flightResultDto.Answer.DestinationList[0] != null &&
              flightResultDto.Answer.DestinationList[0] !== undefined &&
              flightResultDto.Answer.DestinationList[0].ItinerariesList.length === 0) {
              this._appService.showPopup('There are no results for this search, Try again.', 'No results found', true);
              return;
            }

            // Start Angular by showing results.
            this._appService.StartAngular();

            const flightGlobalInfo = this.createflightGlobalInfoObject(flightResultDto);

            this.addResponseIdToFlight(responseId);

            this.onGetFlightResultsJson.next(flightResultDto);
            this.onGetFlightGlobalInfo.next(flightGlobalInfo);
          } catch (error) {
            this._logger.onException(error);
          }
        });
      },
      error => {
        this._logger.onHttpError('getFlghtResultFromApi()', error);
      });

    return false;
  }

  public postSelectedFlightResults(serviceList: ServiceList[]) {
    this._apiService.postSelectedFlightResults(serviceList)
      .subscribe(
      data => {
        try {
          const answerAfterPosting = JSON.parse(data._body).d;
          switch (answerAfterPosting) {
            case 'OK':
              this.handlePostSelectedFlightsSuccess();
              break;
            default:
              this.handlePostSelectedFlightsError(data);
          }
        } catch (error) {
          this._logger.onError(error);
        }
      },
      error => this._logger.onHttpError('getFlghtResultFromApi()', error),
      () => this._logger.logInfo('Finished post selected results.')
      );
  }

  private handlePostSelectedFlightsSuccess(): void {
    try {
      this._appService.showPopup('Saved at server', 'OK', true, false);
      document.getElementById('ctl00_Content_lbtn3').click(); // TODO: delete this line.
    } catch (error) {
      this._logger.onError(error);
    }
    const turnDownAngular: boolean = false;
    this._appService.OnAngularStarted.next(turnDownAngular);
  }

  private handlePostSelectedFlightsError(errorMsg: any): void {
    errorMsg = JSON.parse(errorMsg._body).d;
    this._appService.showPopup(errorMsg, 'Problem occurred', true);
  }

  getMockFlightResults() {
    this._apiService.getMockFlightResults()
      .subscribe(
      (response: any) => {
        let tempMock = response._body;
        tempMock = JSON.parse(tempMock);
        const jsonResponseArray = tempMock.Table;
        if (jsonResponseArray.length === 0) {
          return true;
        }

        jsonResponseArray.forEach(jsonAnswer => {
          const flightResponse: FlightResponseFromServer = jsonAnswer as FlightResponseFromServer;
          try {
            if (flightResponse.ErrorDescriptionIfExist != null) {
              this._appService.showPopup(flightResponse.ErrorDescriptionIfExist, 'Problem occurred', true);
              return;
            }

            if (flightResponse.AnswerResponseJson === null || flightResponse.AnswerResponseJson === '') {
              return true;
            }

            if (flightResponse.RemainingRequestCount === 0) {
              this.isResultsArrived = false; // Stop quastion the api server.
            }

            // Start Angular by showing results.
            this._appService.StartAngular();

            const responseId = flightResponse.CurrentResponseId;
            const flightResponseFullObject = flightResponse.AnswerResponseJson;

            const flightResultDto: FlightResultDto = this._flightResultList = (flightResponseFullObject as FlightResultDto);
            const flightGlobalInfo = this.createflightGlobalInfoObject(flightResultDto);
            this.addResponseIdToFlight(responseId);

            this.onGetFlightResultsJson.next(flightResultDto);
            this.onGetFlightGlobalInfo.next(flightGlobalInfo);
          } catch (error) {
            this._logger.onException(error);
          }

        });
      },
      error => {
        this._logger.onHttpError('getFlghtResultFromApi()', error);
      });

    return false;
  }

  /**
   * Create data for the all flight result //TODO: change this method, split to method.
   * @param {FlightResultDto} flightDto
   * @returns {FlightGlobalInfo}
   * @memberof ObtService
   */
  private createflightGlobalInfoObject(flightDto: FlightResultDto): FlightGlobalInfo {
    const departureAirport: string = flightDto.Answer.DestinationList[0].ItinerariesList[0].Itinerary.ItinerarySegment[0].DepartureAirport;
    const arrivalAirport: string = flightDto.Answer.DestinationList[0].ItinerariesList[0].Itinerary.ItinerarySegment[0].ArrivalAirport;
    const departureDate: Date = flightDto.Answer.DestinationList[0].ItinerariesList[0].Itinerary.ItinerarySegment[0].DepartureDateTime;
    const arrivelDate: Date = flightDto.Answer.DestinationList[0].ItinerariesList[0].Itinerary.ItinerarySegment[0].ArrivalDateTime;


    flightDto.Answer.DestinationList.forEach((destinationList, index) => {
      for (const itinerariesList of destinationList.ItinerariesList) {
        this.setUsdRateToJson(itinerariesList);

        const currentAmount = itinerariesList.Itinerary.ItineraryInfo.UsdAmount;
        const currentMarketingAirlineCode = itinerariesList.Itinerary.ItineraryInfo.MarketingAirline;
        const curentStopQuantity = itinerariesList.Itinerary.ItineraryInfo.StopQuantity;

        // Set max price.
        this._flightGlobalInfo.FlightMaxPrice = this._flightGlobalInfo.FlightMaxPrice < currentAmount ?
          currentAmount : this._flightGlobalInfo.FlightMaxPrice;
        // Set min price.
        this._flightGlobalInfo.FlightMinPrice = this._flightGlobalInfo.FlightMinPrice > currentAmount
          ? currentAmount : this._flightGlobalInfo.FlightMinPrice;

        // push distinct airlines.
        const isExist: boolean = this._flightGlobalInfo.Airlines.some((airline) => airline.Code === currentMarketingAirlineCode);
        if (!isExist) {
          const airlineData: AirlineInfo = this._extandInfoService.AirlineNameList.
            find(airlineItem => airlineItem.Code === currentMarketingAirlineCode);
          if (airlineData) {
            this._flightGlobalInfo.Airlines.push(airlineData);
          }
        }
        // Push Quantity of stops.
        if (!this._flightGlobalInfo.StopQuantity.includes(curentStopQuantity)) {
          this._flightGlobalInfo.StopQuantity.push(curentStopQuantity);
        }
      }
      // Push the total results into array for each destination list.
      const totalResultsPerDestination: number = flightDto.Answer.DestinationList[index].ItinerariesList.length;
      this._flightGlobalInfo.TotalFlightNumber.push(totalResultsPerDestination);
    });

    this._flightGlobalInfo.StopQuantity.sort((a: number, b: number) => {
      return a > b ? 1 : -1;
    });

    this._flightGlobalInfo.FlightMaxPrice += this._flightGlobalInfo.FlightMaxPrice / 100; // TODO: fix this.

    this._flightGlobalInfo.DepartueAirport = departureAirport;
    this._flightGlobalInfo.ArrivelAirport = arrivalAirport;
    this._flightGlobalInfo.DepartureDate = departureDate;
    this._flightGlobalInfo.ArrivelDate = arrivelDate;

    return this._flightGlobalInfo;
  }

  private addResponseIdToFlight(responseId: number): void {
    this._flightResultList.Answer.DestinationList.forEach(dest => {
      dest.ItinerariesList.forEach(itinery => {
        itinery.Itinerary.ItineraryInfo.ResponseId = responseId;
      });
    });

  }

  private setUsdRateToJson(itinerariesList: ItinerariesList): void {
    try {
      if (itinerariesList.Itinerary.AnswerInfo.CurrencyList.Currency[0].FromCode !== 'USD') {
        itinerariesList.Itinerary.ItineraryInfo.UsdAmount =
          itinerariesList.Itinerary.ItineraryInfo.Amount *
          itinerariesList.Itinerary.AnswerInfo.CurrencyList.Currency[0].UsdRate;
      } else {
        itinerariesList.Itinerary.ItineraryInfo.UsdAmount =
          itinerariesList.Itinerary.AnswerInfo.CurrencyList.Currency[0].Amount;
      }
    } catch (error) {
      this._logger.onException(error);
    }
  }
  /**
    * @param {number} refNumber
    * @param {number} currentScreenNumber
    * @returns the Itinerary that you searched for.
    * @memberof ObtService
    */
  public getFlightByRefNumber(refNumber: number, currentScreenNumber: number) {
    const itinerariesList: ItinerariesList[] =
      this.FlightResultList.Answer.DestinationList[currentScreenNumber].ItinerariesList;

    const itinerary = itinerariesList.find(flight => flight.Itinerary.ItineraryInfo.RefNumber === refNumber);

    return itinerary;
  }
}



