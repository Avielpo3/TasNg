import { ItinerariesList } from '../Flight Dto/flight-result.dto';
import { ElementRef } from '@angular/core';

export interface FlightSelectedEvent {
    ScreenNumber: number;
    RefNumber: number;
    ItinerariesList: ItinerariesList;
    IsSelected: boolean;
    RecommendationID: number;
    AnswerID: number;
    ResponseId: number;
}

export interface CurrentFlightInfo {
    ScreenNumber: number;
    currentSlectedFlightRefNumber: number;
}



