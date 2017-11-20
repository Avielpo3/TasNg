import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/flight-result-dto';
import { AirlineInfo } from '../obt/Dto & Enum/airline-name-dto';

@Pipe({
    name: 'byPolicyLevelRating',
})
export class ByPolicyLevelRating implements PipeTransform {

    transform(itinerariesList: ItinerariesList[], policyRating: number): any {
        const filteredItinerariesList: ItinerariesList[] = [];

        itinerariesList.forEach((itinerary, itIdx) => {
            const currentRating: number = itinerary.Itinerary.ItineraryInfo.PolicyInfo.Rating;
            if ( currentRating >= policyRating ) {
                filteredItinerariesList.push(itinerary);
            }
        });

        return filteredItinerariesList;
    }

}
