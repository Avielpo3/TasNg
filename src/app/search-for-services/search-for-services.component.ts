import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTypeEnum, DirectionTypeEnum, SearchByEnum } from '../obt/Dto & Enum/services-type.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ExtendInformationService } from '../services/global services/extand-info.service';

@Component({
  selector: 'app-search-for-services',
  templateUrl: './search-for-services.component.html',
  styleUrls: ['./search-for-services.component.scss']
})
export class SearchForServicesComponent implements OnInit {

  @ViewChild('airportFrom') airportFrom: ElementRef;

  searchForServicesForm: FormGroup;
  _selectedAirportFrom: any;


  constructor(private _router: Router, private _extandInfo: ExtendInformationService) { }



  _searchByOptions: string[] = [
    SearchByEnum[SearchByEnum.Schedule],
    SearchByEnum[SearchByEnum.Price]
  ];

  _directions: string[] = [
    DirectionTypeEnum[DirectionTypeEnum.OneWay],
    DirectionTypeEnum[DirectionTypeEnum.RoundTrip],
    DirectionTypeEnum[DirectionTypeEnum.MultiDestination]
  ];

  _servicesType: string[] = [
    ServiceTypeEnum[ServiceTypeEnum.Flight],
    ServiceTypeEnum[ServiceTypeEnum.Hotel],
    ServiceTypeEnum[ServiceTypeEnum.Car]
  ];

  ngOnInit() {
    this.searchForServicesForm = new FormGroup({
      servicesType: new FormControl(null),
      flightDirection: new FormControl(null),
    });
  }

  navigateToNext(): void {
    // TODO: Change method name. change logic.
    this._router.navigate(['wait-for-results']);
  }

  getAirportList() {
    this._selectedAirportFrom = this.airportFrom.nativeElement.valueChanges
    .debounceTime(400)
    .distinctUntilChanged()
    .switchMap(term => term.length > 2 ? this._extandInfo.getAirportList(term) : Observable.of([]));
  }

  handleAirportSelect(event) {

  }
}
