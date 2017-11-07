import { Component, OnInit, Input } from '@angular/core';
import { ItinerarySegment } from '../../obt/Dto & Enum/Flight Dto/flight-result.dto';
import { ObtService } from '../../services/obt.service';
import { FlightGlobalInfo } from '../../obt/Dto & Enum/Flight Dto/flights-global-info.dto';

export interface FlightDurationGraphData {
  span: number;
  type: string;
}

@Component({
  selector: 'app-flight-duration-graph',
  templateUrl: './flight-duration-graph.component.html',
  styleUrls: ['./flight-duration-graph.component.scss']
})
export class FlightDurationGraphComponent implements OnInit {

  @Input() flightSegments: ItinerarySegment[];

  _flightDurationData: FlightDurationGraphData[] = [];

  private _spanDivide: number;

  constructor(private _obtService: ObtService) { }

  /**
   * Get's the line bar in percentage.
   * @param {number} span
   * @returns {string}
   * @memberof FlightDurationGraphComponent
   */
  getLineWidth(span: number): string {
    return (span / this._spanDivide) + '%';
  }

  ngOnInit() {
    let spanDivide = new Date(this.flightSegments[0].MaximumArrivalDate).getTime() -
      new Date(this.flightSegments[0].MinimumDepartureDate).getTime();

    spanDivide /= 3600000;

    this._spanDivide = spanDivide / 24 * 24 + 24;
    this.createFlightDurationGraphData();
  }


  /**
   * Create's the Bar.
   * @private
   * @memberof FlightDurationGraphComponent
   */
  private createFlightDurationGraphData(): void { // todo: improve this logic.
    const flightDurationArray = this.createDepartureArrivelDurationArray();
    this.calculateGroundAndFlightTimeAndFillDurationGraphData(flightDurationArray);
  }

  /**
   * Get's the values needed for calculation the bar.
   * @private
   * @memberof FlightDurationGraphComponent
   */
  private createDepartureArrivelDurationArray(): any {
    const flightDurationGraphDataArray: FlightDurationGraphData[] = [];
    const flightDurationArray: { flightduration: number, flightDepartue: Date, flightArrivelTime: Date }[] = [];

    this.flightSegments.forEach((segment: ItinerarySegment) => {
      const temp = Math.floor((new Date(segment.ArrivalDateTime).getTime() - new Date(segment.DepartureDateTime).getTime()) / 3600000);
      const flightTime = temp === 0 ? 1 : temp;
      flightDurationArray.push({
        flightduration: flightTime,
        flightDepartue: new Date(segment.DepartureDateTime),
        flightArrivelTime: new Date(segment.ArrivalDateTime)
      });
    });

    return flightDurationArray;
  }

  /**
   * Calculate the ground and the flight duration time.
   * pushes the calculated values to the array.
   * For now it's support only Direct flights.
   * Do not touch this formula.
   * @private
   * @param {any} flightDurationArray
   * @memberof FlightDurationGraphComponent
   */
  private calculateGroundAndFlightTimeAndFillDurationGraphData(flightDurationArray): void {
    if (flightDurationArray.length === 1) {
      const flightDuration: number = flightDurationArray[0].flightduration;
      const flightDepartue: Date = flightDurationArray[0].flightDepartue;
      const flightArrivelTime: Date = flightDurationArray[0].flightArrivelTime;

      const is24Exact = (flightDuration % 24) === 0 ? 0 : 1;
      this._spanDivide = ((Math.floor(flightDuration / 24) + is24Exact) * 24) / 100;

      const GroundTime0: number = flightDepartue.getHours();
      const spanGroundTime0: FlightDurationGraphData = { span: GroundTime0, type: 'ground' };
      this._flightDurationData.push(spanGroundTime0);

      const flightTime: number = flightDuration;
      const spanFlightTime: FlightDurationGraphData = { span: flightTime, type: 'flight' };
      this._flightDurationData.push(spanFlightTime);

      if (flightTime + GroundTime0 < 24) {
        const GroundTime1: number = ((this._spanDivide * 100) - flightArrivelTime.getHours());
        const spanGroundTime1: FlightDurationGraphData = { span: GroundTime1, type: 'ground' };
        this._flightDurationData.push(spanGroundTime1);
      }
    }
  }
}
