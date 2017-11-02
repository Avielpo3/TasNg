import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTypeEnum, DirectionTypeEnum, SearchByEnum } from '../obt/Dto & Enum/services-type.enum';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-search-for-services',
  templateUrl: './search-for-services.component.html',
  styleUrls: ['./search-for-services.component.scss']
})
export class SearchForServicesComponent implements OnInit {

  constructor(private _router: Router) { }

  searchForServicesForm: FormGroup;

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

}
