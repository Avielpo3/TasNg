import { Component, OnInit, Input } from '@angular/core';
import { ItinerarySegment } from '../../../../Dto & Enum/flight-result-dto';
import { ObtService } from '../../../../../services/obt.service';
import { AirportCodeToCityAndCountryName } from '../../../../Dto & Enum/airport-city-country-dto';
import { ApiService } from '../../../../../services/api.service';
import { ExtendInformationService } from '../../../../../services/global services/extand-info.service';
import { UserService } from '../../../../../services/user.service';

@Component({
  selector: 'app-flight-result-leg',
  templateUrl: './flight-result-leg.component.html',
  styleUrls: ['./flight-result-leg.component.scss']
})
export class ResultDetailComponent implements OnInit {

  @Input() _segment: ItinerarySegment;
  @Input() _currency: ItinerarySegment;
  @Input() _totalSegemntsAtFlight: number;

  // DOM Connected.
  _airportName: string;
  _arrivelAirportCityCountryInfo: AirportCodeToCityAndCountryName;
  _departurelAirportCityCountryInfo: AirportCodeToCityAndCountryName;

  constructor(private _exInfoService: ExtendInformationService, private _userService: UserService ) {
  }

  ngOnInit() {
    // Getting ** Arrivel ** info.
    this._arrivelAirportCityCountryInfo = this._exInfoService.AirportToCityAndCountryNameList
      .find(airport => airport.AirportCode === this._segment.ArrivalAirport);
    // Getting ** Departure ** info.                                                            // TODO: Merge both find for quality.
    this._departurelAirportCityCountryInfo = this._exInfoService.AirportToCityAndCountryNameList
      .find(airport => airport.AirportCode === this._segment.DepartureAirport);
    // Getting ** Airport - Name **
    this._airportName = this._exInfoService.AirlineNameList
      .find(airport => airport.Code === this._segment.MarketingAirline).Name;
  }

  getFlightSegmentDuration(): string {
    const HourInMilliSec = 3600000;
    const MinutesInMilliSec = 60000;

    const arrivelTimeDate = new Date(this._segment.ArrivalDateTime).getTime();
    const departureTimeDate = new Date(this._segment.DepartureDateTime).getTime();

    const durationSegmentFlightTime = arrivelTimeDate - departureTimeDate;

    const hoursAmount = Math.floor(durationSegmentFlightTime / HourInMilliSec);
    const minutesAmount = (durationSegmentFlightTime - (hoursAmount * HourInMilliSec)) / MinutesInMilliSec;

    const resultHourWithMinutes: string = hoursAmount + 'h' + ' ' + minutesAmount + 'm';


    return resultHourWithMinutes;
  }

}
