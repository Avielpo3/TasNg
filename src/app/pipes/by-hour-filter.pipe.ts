import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/Flight Dto/flight-result.dto';

@Pipe({
    name: 'byHourFilter',
    pure: false
})
export class ByHourFilterPipe implements PipeTransform {

    transform(itinerariesList: ItinerariesList[], hourFromFilter: { min: number, max: number }, isDepurture: boolean): any {
        const filtereditinerariesList: ItinerariesList[] = [];

        itinerariesList.forEach((itinerary, itIdx) => {
            const hour = this.getHourFromFlight(itinerary, isDepurture);
            if (hour >= hourFromFilter.min && hour <= hourFromFilter.max) {
                this.pushItineraryToArray(itinerary, filtereditinerariesList);
            }
        });

        return filtereditinerariesList;
    }

    // Check if the filter is for Depurture or arrivel, and return the relevant hour.
    getHourFromFlight(itinerary: ItinerariesList, isDepurture: boolean): number {
        let hour;
        try {
            const lastSegmentIndex: number = itinerary.Itinerary.ItinerarySegment.length - 1;
            hour = isDepurture ? new Date(itinerary.Itinerary.ItinerarySegment[0].DepartureDateTime).getHours() :
                new Date(itinerary.Itinerary.ItinerarySegment[lastSegmentIndex].ArrivalDateTime).getHours();
        } catch (error) {
            hour = 0; // TODO: FIX IT
        }


        return hour;
    }

    // Push the itinerary into the new array for filtering results.
    pushItineraryToArray(itinerary: ItinerariesList, filtereditinerariesList: ItinerariesList[]): void {
        const itinerariesList: ItinerariesList[] = [];
        itinerariesList.push(itinerary);
        filtereditinerariesList.push(itinerary);
    }

}
