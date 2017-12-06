import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/flight-result-dto';

@Pipe({
    name: 'byStopQuantityFilter',
    pure: false
})
export class ByStopQuantityFilterPipe implements PipeTransform {

    transform(itinerariesList: ItinerariesList[], stopQuantityArray: number[]): any {
        const filtereditinerariesList: ItinerariesList[] = [];

        itinerariesList.forEach((itinerary, itIdx) => {
            const stopQuantity: number = itinerary.Itinerary.ItineraryInfo.StopQuantity;
            if (typeof stopQuantityArray[stopQuantity] === 'undefined') {
                filtereditinerariesList.push(itinerary);
            }
        });

        return filtereditinerariesList;
    }

}
