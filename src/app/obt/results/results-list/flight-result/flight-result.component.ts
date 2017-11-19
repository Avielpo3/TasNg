import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef
} from '@angular/core';
import {
  ItinerariesList,
  ItinerarySegment,
  ItineraryInfo
} from '../../../Dto & Enum/flight-result-dto';
import { FlightSelectedEvent } from '../../../Dto & Enum/EventsDto/flight.event';
import { FlightResultSelectedOptions } from '../../../Dto & Enum/flight-result-enum';
import { ObtService } from '../../../../services/obt.service';
import { ExtendInformationService } from '../../../../services/global services/extand-info.service';
import { FlightDurationGraphData } from '../../../../shared/flight-duration-graph/flight-duration-graph.component';
import { UserService } from '../../../../services/user.service';
import { environment } from '../../../../../environments/environment';
import { SelectFlightResultService } from '../../../../services/select-flight.service';

@Component({
  selector: 'app-flight-result',
  templateUrl: './flight-result.component.html',
  styleUrls: ['./flight-result.component.scss']
})
export class ResultComponent implements OnInit {
  // Input properties
  @Input() _itinerary: ItinerariesList;
  @Input() _currentScreen: number;

  @ViewChild('flightResult') flightResultRef: ElementRef;

  // Output properties
  @Output()
  onFlightSelectedUnselected = new EventEmitter<FlightSelectedEvent>();

  _itineraryInfo: ItineraryInfo;
  _itinerarySegments: ItinerarySegment[];
  // private members.

  // DOM Elements
  _isFlightSelected: boolean = false;
  _departureCityName: string;
  _arrivelCityName: string;
  _userCurrencyCode: string;

  constructor(
    private _obtService: ObtService,
    private _extandInfoService: ExtendInformationService,
    private _userService: UserService,
    private _selectFlightService: SelectFlightResultService
  ) {}

  ngOnInit(): void {
    this._userCurrencyCode = this._userService.UserInformation.CurrencyCode;
    this._itineraryInfo = this._itinerary.Itinerary.ItineraryInfo;
    this._itinerarySegments = this._itinerary.Itinerary.ItinerarySegment;
    this._isFlightSelected = this._itinerary.Itinerary.AnswerInfo.IsSelected;
    this.setDepartureAndArrivelCityName();
  }

  /**
   * When clicking on the select / unselect flight, This method firing.
   * @memberof ResultComponent
   */
  handleSelectFlightClick(): void {
    const flightEvent: FlightSelectedEvent = this.createFlightEvent();
    this._selectFlightService.OnFlightResultSelectedUnselected.next(
      flightEvent
    );
  }

  /**
   * When componnent is creating, set dynamiclly the logo to the flight-result, by the JSON file.
   * @param {string} marketingAirline
   * @returns
   * @memberof ResultComponent
   */
  getAirlineLogo(marketingAirline: string) {
    return environment.AirlinesLogoPath + marketingAirline + '.gif';
  }

  getAirlineNameByCode(): string {
    return this._extandInfoService.getAirlineNameByCode(
      this._itineraryInfo.MarketingAirline
    );
  }

  createFlightEvent(): FlightSelectedEvent {
    this._isFlightSelected = !this._itinerary.Itinerary.AnswerInfo.IsSelected;

    const flightEvent: FlightSelectedEvent = {
      ItinerariesList: this._itinerary,
      ScreenNumber: this._currentScreen,
      IsSelected: this._isFlightSelected,
      RefNumber: this._itinerary.Itinerary.ItineraryInfo.RefNumber,
      RecommendationID: this._itinerary.Itinerary.ItineraryInfo
        .RecommendationID,
      AnswerID: this._itinerary.Itinerary.ItineraryInfo.AnswerID,
      ResponseId: this._itineraryInfo.ResponseId
    };

    return flightEvent;
  }

  /**
   * Set's the City name for the segment information.
   * @private
   * @memberof ResultComponent
   */
  private setDepartureAndArrivelCityName(): void {
    this._departureCityName = this._extandInfoService.getCityAndCountryByAirportCode(
      this._itinerarySegments[0].DepartureAirport
    ).CityName;

    this._arrivelCityName = this._extandInfoService.getCityAndCountryByAirportCode(
      this._itinerarySegments[this._itinerarySegments.length - 1].ArrivalAirport
    ).CityName;
  }

  onHideOverlay(event, overlayPopupRef) {
    setTimeout(() => {
      overlayPopupRef.hide();
    }, 250);
  }
}
