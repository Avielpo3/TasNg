import { Injectable } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/flight-result-dto';
import { FlightSelectedEvent, CurrentFlightInfo } from '../obt/Dto & Enum/EventsDto/flight.event';
import { ObtService } from './obt.service';
import { Subject } from 'rxjs/Subject';
import { ExtendInformationService } from './global services/extand-info.service';

@Injectable()
export class SelectFlightResultService {

    private _currentFlightInfo: CurrentFlightInfo[] = [];

    private _onFlightResultSelectedUnselected: Subject<FlightSelectedEvent> = new Subject<FlightSelectedEvent>();
    public get OnFlightResultSelectedUnselected(): Subject<FlightSelectedEvent> {
        return this._onFlightResultSelectedUnselected;
    }

    /**
     * @Injectable
     */
    constructor(private _obtService: ObtService) {
        this.OnFlightResultSelectedUnselected.
            subscribe((flightEvent: FlightSelectedEvent) => this.handleFlightSelectedUnselected(flightEvent));
    }


    private handleFlightSelectedUnselected(flightEvent: FlightSelectedEvent) {
        const IsSelected: boolean = flightEvent.IsSelected;
        const flightRefNumber: number = flightEvent.ItinerariesList.Itinerary.ItineraryInfo.RefNumber;
        const currentScreenNumber: number = flightEvent.ScreenNumber;

        if (this._currentFlightInfo.length === 0) {
            this._obtService.getFlightByRefNumber(flightRefNumber, currentScreenNumber).Itinerary.AnswerInfo.IsSelected = IsSelected;
            this._currentFlightInfo.push({
                ScreenNumber: currentScreenNumber,
                currentSlectedFlightRefNumber: flightRefNumber,
            });
            this.setNewFlightSelection(flightRefNumber, currentScreenNumber);

            return;
        }

        if (IsSelected) {
            this.setNewFlightSelection(flightRefNumber, currentScreenNumber);
        } else {
            this.deselectFlight(flightRefNumber, currentScreenNumber);
        }
    }

    /**
     * Set the new flight selection.
     * And also, filter out results by selection.
     * @private
     * @param {number} currentFlightRef
     * @param {number} currentScreenNumber
     * @memberof ObtService
     */
    private setNewFlightSelection(currentFlightRef: number, currentScreenNumber: number): void {
        const isExist = this._currentFlightInfo.some(fe => fe.ScreenNumber === currentScreenNumber);
        if (isExist) {
            const oldSelection = this._currentFlightInfo.find(fe => fe.ScreenNumber === currentScreenNumber);
            if (oldSelection.currentSlectedFlightRefNumber !== null) {
                // unselect last option if selcted allready.
                this._obtService.getFlightByRefNumber(oldSelection.currentSlectedFlightRefNumber, oldSelection.ScreenNumber)
                    .Itinerary.AnswerInfo.IsSelected = false;
            }
            // select new option.
            this._obtService.getFlightByRefNumber(currentFlightRef, currentScreenNumber).Itinerary.AnswerInfo.IsSelected = true;
            // update info
            oldSelection.currentSlectedFlightRefNumber = currentFlightRef;
        } else {
            this._obtService.getFlightByRefNumber(currentFlightRef, currentScreenNumber).Itinerary.AnswerInfo.IsSelected = true;
            this._currentFlightInfo.push({ currentSlectedFlightRefNumber: currentFlightRef, ScreenNumber: currentScreenNumber });
        }

        this.FilterNextScreenFlightsByCurrentSelection(currentScreenNumber, currentFlightRef);
    }
    /**
   * De-Select the result item flight when clicked.
   * @private
   * @param {number} currentScreenNumber
   * @memberof ObtService
   */
    private deselectFlight(currentFlightRef: number, currentScreenNumber: number): void {
        this._currentFlightInfo.find(flight => flight.ScreenNumber === currentScreenNumber).currentSlectedFlightRefNumber = null;
        this._obtService.getFlightByRefNumber(currentFlightRef, currentScreenNumber).Itinerary.AnswerInfo.IsSelected = false;
    }

    /**
     * Set the next flights results screen by the current selection.
     * e.g: Filter out results that the departure time of the next leg is before the arrival time of the previous leg.
     * e.g2: arrival 17/10 20:00, dep 17/10 18:00 -> Can't be!
     * @private
     * @param {number} currentScreenNumber
     * @param {number} currentFlightRef
     * @memberof ObtService
     */
    private FilterNextScreenFlightsByCurrentSelection(currentScreenNumber: number, currentFlightRef: number): void {
        const nextScreenNumber = currentScreenNumber + 1;
        const currentItinerary = this._obtService.getFlightByRefNumber(currentFlightRef, currentScreenNumber).Itinerary;
        const itinerariesListNew: ItinerariesList[] = [];
        if (nextScreenNumber < this._obtService.FlightResultList.Answer.DestinationList.length) {
            this._obtService.FlightResultList.Answer.DestinationList[nextScreenNumber].ItinerariesList.forEach(flight => {
                const depDateTime = flight.Itinerary.ItinerarySegment[0].DepartureDateTime;

                const currentItineraryLength = currentItinerary.ItinerarySegment.length - 1;
                const arrivalDateTime = currentItinerary.ItinerarySegment[currentItineraryLength].ArrivalDateTime;

                if (depDateTime > arrivalDateTime) {
                    itinerariesListNew.push(flight);
                }
            });

            this._obtService.FlightResultList.Answer.DestinationList[nextScreenNumber].ItinerariesList = itinerariesListNew;
            currentItinerary.AnswerInfo.ReturnOptions = itinerariesListNew.length;
        }
    }
}
