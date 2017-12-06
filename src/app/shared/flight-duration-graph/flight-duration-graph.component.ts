import { Component, OnInit, Input } from '@angular/core';
import { ItinerarySegment } from '../../obt/Dto & Enum/flight-result-dto';
import { ObtService } from '../../services/obt.service';
import { FlightGlobalInfo } from '../../obt/Dto & Enum/flights-global-info';

export interface FlightDurationGraphData {
  span: number;
  type: string;
  left?: number;
}

@Component({
  selector: 'app-flight-duration-graph',
  templateUrl: './flight-duration-graph.component.html',
  styleUrls: ['./flight-duration-graph.component.scss']
})
export class FlightDurationGraphComponent implements OnInit {

  @Input() flightSegments;
  @Input() currentScreen: number;

  _flightDurationData: FlightDurationGraphData[] = [];

  _durationTotalLineLength: number = 0;

  private _spanDivide: number;
  private _multipleNumberForFlightDuration: number = 1;

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

  getLineLeftPosition(span: number): string {
    return (span / this._spanDivide) + '%';
  }

  ngOnInit() {
    this._obtService.onGetFlightGlobalInfo.subscribe((globalInfo: FlightGlobalInfo) => {
      const tempDate = new Date(globalInfo.DepartureDate).toDateString();
      const totalSpanHours = Math.floor(new Date(globalInfo.LastArrivalSegment[this.currentScreen]).getTime()
        - new Date(tempDate).getTime()) / 3600000;
      this._spanDivide = (((totalSpanHours / 24) * 24) + 24) / 100;
      this.createFlightDurationGraphData();
    });
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
    const flightDurationArray: {
      flightduration: number,
      flightDepartue: Date,
      flightArrivelTime: Date
    }[] = [];

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
    let flightTime: number = 0;
    const leftPosition: number = 0;

    flightDurationArray.forEach((flightDurationSegment, index) => {
      const flightDuration: number = flightDurationArray[index].flightduration;
      const flightDepartue: Date = flightDurationArray[index].flightDepartue;
      const flightArrivelTime: Date = flightDurationArray[index].flightArrivelTime;

      let groundTime: number;
      if (index === 0) {
        groundTime = flightDepartue.getHours();
        const spanGroundTime: FlightDurationGraphData = { span: groundTime, type: 'ground', left: groundTime + flightDuration };
        this._flightDurationData.push(spanGroundTime);
      } else {
        groundTime = (new Date(flightDepartue).getTime() - new Date(flightDurationArray[index - 1].flightArrivelTime)
        .getTime()) / 3600000;
        const groundBreak: FlightDurationGraphData = {
          span: groundTime, type: 'ground-break',
          left: this._flightDurationData[index - 1].left
        };
        this._flightDurationData.push(groundBreak);
      }

      flightTime += index === 0 ? flightDuration * 4 : (flightDuration + groundTime) * 4;
    });

    const spanFlightTime: FlightDurationGraphData = { span: flightTime, type: 'flight' };
    this._flightDurationData.push(spanFlightTime);

    let finalGroundTime: number = this._flightDurationData
      .map(flightData => flightData.span)
      .reduce((sum, current) => sum + current);

    finalGroundTime = this._spanDivide * 100 - finalGroundTime;

    const spanGroundTime: FlightDurationGraphData = { span: finalGroundTime, type: 'ground' };
    this._flightDurationData.push(spanGroundTime);

  }
}
