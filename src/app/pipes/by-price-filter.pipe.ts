import { Pipe, PipeTransform } from '@angular/core';
import { ItinerariesList } from '../obt/Dto & Enum/flight-result-dto';

@Pipe({
  name: 'byPriceFilter',
  pure: false
})
export class ByPriceFilterPipe implements PipeTransform {

  transform(itinerariesList: ItinerariesList[], amountRange: { min: number, max: number }): any {
    const filtereditinerariesList: ItinerariesList[] = [];

    itinerariesList.forEach((itinerary, itIdx) => {
      const amount: number = itinerary.Itinerary.ItineraryInfo.UsdAmount;
      if (amount >= amountRange.min && amount <= amountRange.max) {
        filtereditinerariesList.push(itinerary);
      }
    });

    return filtereditinerariesList;
  }

}
