import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceTypeEnum, DirectionTypeEnum, SearchByEnum } from '../obt/Dto & Enum/services-type.enum';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { ExtendInformationService } from '../services/global services/extand-info.service';
import { Subject } from 'rxjs/Subject';
import { Subscription } from 'rxjs/Subscription';
import { LoggerService } from '../services/logger.service';
import { SearchForServicesService } from '../services/search-for-services.service';
import { AirportByName } from '../obt/Dto & Enum/Airports Dto/airport-from-db.dto';

@Component({
  selector: 'app-search-for-services',
  templateUrl: './search-for-services.component.html',
  styleUrls: ['./search-for-services.component.scss']
})
export class SearchForServicesComponent implements OnInit, OnDestroy {

  searchForServicesForm: FormGroup;
  _selectedAirportFrom: AirportByName;

  /**
   * Creates an instance of SearchForServicesComponent.
   * @param {Router} _router
   * @param {ExtendInformationService} _extandInfo
   * @param {LoggerService} _logger
   * @memberof SearchForServicesComponent
   */
  constructor(private _router: Router,
    private _extandInfo: ExtendInformationService,
    private _logger: LoggerService,
    private _searchForServicesService: SearchForServicesService) { }

  directionType: DirectionTypeEnum;

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

  handleAirportSelect(event) {
  }

  ngOnDestroy(): void {
  }
}
