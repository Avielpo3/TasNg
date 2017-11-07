import { Injectable } from '@angular/core';
import { SortByDto, SortByFilterArray } from '../obt/Dto & Enum/PrimeNgDto/SortByDto';
import { EnumUtils } from '../Utils/enum-utils';
import { SortByOptions } from '../obt/Dto & Enum/sort-by.enum';
import { ObtService } from './obt.service';
import { ItinerariesList } from '../obt/Dto & Enum/Flight Dto/flight-result.dto';
import { LoggerService } from './logger.service';

@Injectable()
export class SortByService {
    private _sortByDto: SortByDto;
    private _sortByArray: SortByFilterArray[] = [];

    /**
     * Return's the sortBy array.
     * @readonly
     * @type {string[]}
     * @memberof SortByService
     */
    get Sort(): SortByDto {
        return this._sortByDto;
    }

    /**
     * Creates an instance of SortByService.
     * @memberof SortByService
     */
    constructor(private _obtService: ObtService,
        private _logger: LoggerService) {
        this.createSortByArray();
        this.createSortByObject();
    }

    /**
     * Create an array of label value
     * @memberof SortByService
     */
    createSortByArray() {
        const names = EnumUtils.getAllEnumMembers(SortByOptions);
        names.forEach(enumItem => {
            const valueEnum: SortByOptions = SortByOptions[enumItem];
            const sortByFilterArray: SortByFilterArray = { label: enumItem, value: valueEnum };
            this._sortByArray.push(sortByFilterArray);
        });
    }

    createSortByObject(): void {
        this._sortByDto = {
            filterByArray: this._sortByArray,
            IsVisible: true,
            Name: 'Sort By Filter',
        };
    }

    handleSortByChange(sortByFilterValue: number) {
        const dropdownOptionValue: SortByOptions = sortByFilterValue;
        let sortingFunction: (a: ItinerariesList, b: ItinerariesList) => number;
        switch (dropdownOptionValue) {
            case SortByOptions.Price:
                sortingFunction = this.compareByPrice;
                break;
            case SortByOptions.Airlines:
                this._obtService.FlightResultList.Answer.DestinationList.forEach(desList => {
                    desList.ItinerariesList.sort();
                });
                return;
            case SortByOptions.Policy:
                this._logger.logInfo('Not implemented yet!');
                return;
            case SortByOptions.Stops:
                sortingFunction = this.compareByStopQuantity;
                break;
            case SortByOptions.Class:
                break;
            case SortByOptions.ArrivalTime:
                sortingFunction = this.compareByArrivelTime;
                break;
            case SortByOptions.DepartureTime:
                sortingFunction = this.compareByDepartureTime;
                break;
            case SortByOptions.TotalFlightTime:
                sortingFunction = this.compareByFlightDuration;
                break;
            default:
                sortingFunction = this.compareByPrice;
                break;
        }

        this._obtService.FlightResultList.Answer.DestinationList.forEach(desList => {
            desList.ItinerariesList.sort(sortingFunction);
        });
    }

    /**
     * Comparator, comparing by flight price.
     * @param {ItinerariesList} a
     * @param {ItinerariesList} b
     * @returns {number}
     * @memberof SortByService
     */
    compareByPrice(a: ItinerariesList, b: ItinerariesList): number {
        if (a.Itinerary.ItineraryInfo.Amount > b.Itinerary.ItineraryInfo.Amount) {
            return 1;
        } else if (a.Itinerary.ItineraryInfo.Amount < b.Itinerary.ItineraryInfo.Amount) {
            return -1;
        }

        return 0;
    }

    /**
     * Comparator, comparing by Stop Quantity.
     * @param {ItinerariesList} a
     * @param {ItinerariesList} b
     * @returns {number}
     * @memberof SortByService
     */
    compareByStopQuantity(a: ItinerariesList, b: ItinerariesList): number {
        if (a.Itinerary.ItineraryInfo.StopQuantity < b.Itinerary.ItineraryInfo.StopQuantity) {
            return 1;
        } else if (a.Itinerary.ItineraryInfo.StopQuantity > b.Itinerary.ItineraryInfo.StopQuantity) {
            return -1;
        }

        return 0;
    }

    /**
     * Comparator, comparing by Total flight duration time.
     * @param {ItinerariesList} a
     * @param {ItinerariesList} b
     * @returns {number}
     * @memberof SortByService
     */
    compareByFlightDuration(a: ItinerariesList, b: ItinerariesList): number {
        if (a.Itinerary.ItineraryInfo.TotalDurationTime < b.Itinerary.ItineraryInfo.TotalDurationTime) {
            return 1;
        } else if (a.Itinerary.ItineraryInfo.TotalDurationTime > b.Itinerary.ItineraryInfo.TotalDurationTime) {
            return -1;
        }

        return 0;
    }

    /**
    * Comparator, comparing by Departure time.
    * @param {ItinerariesList} a
    * @param {ItinerariesList} b
    * @returns {number}
    * @memberof SortByService
    */
    compareByDepartureTime(a: ItinerariesList, b: ItinerariesList): number {
        if (a.Itinerary.ItinerarySegment[0].DepartureDateTime > b.Itinerary.ItinerarySegment[0].DepartureDateTime) {
            return 1;
        } else if (a.Itinerary.ItinerarySegment[0].DepartureDateTime < b.Itinerary.ItinerarySegment[0].DepartureDateTime) {
            return -1;
        }

        return 0;
    }

    compareByArrivelTime(a: ItinerariesList, b: ItinerariesList): number {
        const aLength = a.Itinerary.ItinerarySegment.length - 1;
        const bLength = b.Itinerary.ItinerarySegment.length - 1;

        if (a.Itinerary.ItinerarySegment[aLength].ArrivalDateTime > b.Itinerary.ItinerarySegment[bLength].ArrivalDateTime) {
            return 1;
        } else if (a.Itinerary.ItinerarySegment[aLength].ArrivalDateTime < b.Itinerary.ItinerarySegment[bLength].ArrivalDateTime) {
            return -1;
        }

        return 0;
    }
}
