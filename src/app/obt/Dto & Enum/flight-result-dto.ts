import { FlightResultSelectedOptions } from './flight-result-enum';

export interface BaseFare {
  Amount: number;
  CurrencyCode: string;
  DecimalPlces: number;
}

export interface TotalFare {
  ACC_COD?: any;
  Amount: number;
  CurrencyCode?: any;
  DecimalPlaces: number;
  TotalBase: number;
  TotalTax: number;
}

export interface PassengerFare {
  BaseFare: BaseFare;
  EquivFare?: any;
  TPA_Extensions?: any;
  Taxes?: any;
  TotalFare: TotalFare;
}

export interface PTCFareBreakdown {
  FareBasis?: any;
  FareRuleInfos?: any;
  PassengerFare: PassengerFare;
  PassengerTypeQuantity?: any;
}

export interface PTCFareInfo {
  ArrivalAirport?: any;
  DepartureAirport?: any;
  Distance?: any;
  FareReference?: any;
  FareRuleInfos?: any;
  PTC_FareBreakdown: PTCFareBreakdown[];
}

export interface AirItineraryPricingInfo {
  CommentsXml?: any;
  ItineraryTotalFare?: any;
  PTC_FareInfo: PTCFareInfo;
}

export interface ItineraryInfo {
  DirectionId: number;
  Errors?: any;
  CacheDataAgeSeconds?: any;
  LastDayToPurchase?: any;
  ServiceFeeAmount: number;
  SupplierInfo?: any;
  TotalDurationTime: string;
  TotalDurationTimeMinutes: string;
  TotalElapsedTime: string;
  TotalElapsedTimeMinutes: string;
  TotalGroundTime: string;
  TotalGroundTimeMinutes: string;
  AirItineraryPricingInfo: AirItineraryPricingInfo;
  Amount: number;
  UsdAmount: number;
  Complete?: any;
  CurrencyCode?: any;
  ETiketing?: any;
  LogoNameSuffix?: any;
  MarketingAirline: string;
  PolicyInfo?: any;
  RequiredParameterList?: any;
  RoutingID?: any;
  SequenceNumber: number;
  StopQuantity: number;
  TotalBase: number;
  TotalTax: number;
  VendorURL?: any;
  RefNumber: number;
  RecommendationID: number;
  AnswerID: number;
  ResponseId: number;
}

export interface MarketingCabin {
  CabinType: string;
  Meal?: any;
  TfClass?: any;
}

export interface ItinerarySegment {
  FareRuleInfo?: any;
  ArrTerminal?: any;
  ArrivalAirport: string;
  ArrivalAirportName?: any;
  ArrivalDateTime: Date;
  ArrivalTimeZone?: any;
  BookingCodeList?: any;
  BookingModifier?: any;
  CabinType?: any;
  ConnectionIndicator?: any;
  ConnectionNumber?: any;
  CorporateID?: any;
  DepTerminal?: any;
  DepartureAirport: string;
  DepartureAirportName?: any;
  DepartureDateTime: Date;
  DepartureTimeZone?: any;
  ElapsedTime?: any;
  Equipment: string;
  FareCode?: any;
  FlightNumber: string;
  IntermediatePointInfo?: any;
  MarketingAirline: string;
  MarketingCabin: MarketingCabin;
  Meal?: any;
  Miles: number;
  OperatingAirline: string;
  OutwardReurnID?: any;
  RPH: number;
  ResBookDesignCode: string;
  StopQuantity: number;
  TPA_Extensions?: any;
  TfClass?: any;
  isOutwardIndication?: any;
}

export interface Currency {
  Amount: number;
  FromCode: string;
  Name?: any;
  ToCode: string;
  UsdRate: number;
}

export interface CurrencyList {
  Currency: Currency[];
}

export interface Source2 {
  FromSource: number;
}

export interface Source {
  IPCC: string;
  IPCCAccountName: string;
  Source: Source2;
}

export interface AnswerInfo {
  CommandName?: any;
  CurrencyList: CurrencyList;
  Error?: any;
  Source: Source;
  TransactionID: string;
  IsSelected: boolean;
  ReturnOptions: number;
}

export interface Itinerary {
  ItineraryInfo: ItineraryInfo;
  ItinerarySegment: ItinerarySegment[];
  AnswerInfo: AnswerInfo;
}

export interface ItinerariesList {
  Itinerary: Itinerary;
}



export interface DestinationList {
  ItinerariesList: ItinerariesList[];
}

export interface Answer {
  DestinationList: DestinationList[];
}

export interface FlightResultDto {
  Answer: Answer;
  Version: string;
}

export interface FlightResponseFromServer {
  RemainingRequestCount: number;
  CurrentResponseId: number;
  ErrorDescriptionIfExist: string;
  AnswerResponseJson: any;
}


