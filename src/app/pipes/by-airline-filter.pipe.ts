import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/flight-result-dto';
import { AirlineInfo } from '../obt/Dto & Enum/airline-name-dto';

@Pipe({
    name: 'byAirlineFilter',
})
export class ByAirlineFilterPipe implements PipeTransform {

    transform(itinerariesList: ItinerariesList[], airlineArray: AirlineInfo[]): any {
        const filteredItinerariesList: ItinerariesList[] = [];

        itinerariesList.forEach((itinerary, itIdx) => {
            const airlineCode: string = itinerary.Itinerary.ItineraryInfo.MarketingAirline;
            if (airlineArray.some(a => a.Code === airlineCode)) {
                filteredItinerariesList.push(itinerary);
            }
        });

        return filteredItinerariesList;
    }

}
