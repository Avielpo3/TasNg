import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/Flight Dto/flight-result.dto';

@Pipe({
    name: 'byShowResultsOutOfPolicy',
})
export class ByShowResultsOutOfPolicyPipe implements PipeTransform {

    transform(itinerariesList: ItinerariesList[], isInsidePolicy: boolean): any {
        const filteredItinerariesList: ItinerariesList[] = [];

        // No need to check anything, return the current list
        if (isInsidePolicy) {
            return itinerariesList;
        }

        itinerariesList.forEach((itinerary, itIdx) => {
            const isInPolicy: boolean = itinerary.Itinerary.ItineraryInfo.PolicyInfo.IsInPolicy;
            // Show only results within the policy
            if (isInPolicy === true) {
                filteredItinerariesList.push(itinerary);
            }
        });

        return filteredItinerariesList;
    }

}
