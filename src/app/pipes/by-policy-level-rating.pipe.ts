import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/Flight Dto/flight-result.dto';

@Pipe({
    name: 'byPolicyLevelRating',
})
export class ByPolicyLevelRatingPipe implements PipeTransform {

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
