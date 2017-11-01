import { AirlineInfo } from './airline-name-dto';

export interface FlightGlobalInfo {
    Airlines: AirlineInfo[];
    FlightMinPrice: number;
    FlightMaxPrice: number;
    TotalFlightNumber: number[];
    StopQuantity: number[];
    DepartueAirport: string;
    ArrivalAirport: string;
    DepartureDate: Date;
    ArrivalDate: Date;
}
