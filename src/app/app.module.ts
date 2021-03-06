// 3rd Party
import { AccordionModule, ButtonModule } from 'primeng/primeng';     // accordion and accordion tab
import { MenuItem, StepsModule } from 'primeng/primeng';            // api
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule, DropdownModule, CheckboxModule, OverlayPanelModule, DialogModule, AutoCompleteModule } from 'primeng/primeng';

// Translate
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Bootstrap
import { CollapseModule } from 'ngx-bootstrap/collapse';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';

import { HttpModule } from '@angular/http';
import { LoggerService } from './services/logger.service';

import { FiltersComponent } from './obt/filters/filters.component';
import { WaitForResultsComponent } from './obt/wait-for-results/wait-for-results.component';
import { FilterComponent } from './obt/filters/filter/filter.component';
import { ApiService } from './services/api.service';
import { ObtService } from './services/obt.service';
import { ResultsListComponent } from './obt/results/results-list/results-list.component';
import { ResultComponent } from './obt/results/results-list/flight-result/flight-result.component';
import { ResultDetailComponent } from './obt/results/results-list/flight-result/flight-result-leg/flight-result-leg.component';
import { FilterService } from './services/filter.service';
import { ByPriceFilterPipe } from './pipes/by-price-filter.pipe';
import { SliderModule } from 'primeng/primeng';
import { ByHourFilterPipe } from './pipes/by-hour-filter.pipe';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { FlightResultSelectedDirective } from './directives/flight-result.directive';
import { SortByService } from './services/sort.service';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome';
import { ByStopQuantityFilterPipe } from './pipes/by-stop-quantity-filter.pipe';
import { ByAirlineFilterPipe } from './pipes/by-airline-filter.pipe';
import { ExtendInformationService } from './services/global services/extand-info.service';
import { FlightDurationGraphComponent } from './shared/flight-duration-graph/flight-duration-graph.component';
import { FlightListNavigatorComponent } from './shared/flight-list-navigator/flight-list-navigator.component';
import { PolicySliderComponent } from './shared/policy-slider/policy-slider.component';
import { UserService } from './services/user.service';
import { UserCurrencyPipe } from './pipes/user-currency.pipe';
import { AppService } from './services/app.service';
import { FilterPriceComponent } from './obt/filters/filter/filter-price.component';
import { WindowRefService } from './services/global services/window.service';
import { SelectFlightResultService } from './services/select-flight.service';
import { HeadNavigationBarComponent } from './head-navigation-bar/head-navigation-bar.component';
import { ResultsScreenComponent } from './obt/results-screen.component';
import { SearchForServicesComponent } from './search-for-services/search-for-services.component';
import { SearchForServicesService } from './services/search-for-services.service';
import { TextOnDemandComponent } from './shared/text-on-demand/text-on-demand.component';
import { TextOnDemandService } from './shared/text-on-demand/text-on-demand.service';
import { InfiniteScrollerDirective } from './directives/infinite-scroll.directive';
import { ByPolicyLevelRatingPipe } from './pipes/by-policy-level-rating.pipe';
import { ByShowResultsOutOfPolicyPipe } from './pipes/by-show-results-out-of-policy.pipe';


const appRoutes: Routes = [
  { path: 'search', component: SearchForServicesComponent },
  { path: 'wait-for-results', component: WaitForResultsComponent },
  { path: 'results-list', component : ResultsScreenComponent }
];


export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, 'tas-angular/Angular/assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    ResultsListComponent,
    ResultComponent,
    ResultDetailComponent,
    WaitForResultsComponent,
    FiltersComponent,
    FilterComponent,
    FilterPriceComponent,
    ResultsScreenComponent,
    ByPriceFilterPipe,
    ByHourFilterPipe,
    UserCurrencyPipe,
    FlightResultSelectedDirective,
    InfiniteScrollerDirective,
    ByStopQuantityFilterPipe,
    ByPolicyLevelRatingPipe,
    ByShowResultsOutOfPolicyPipe,
    ByAirlineFilterPipe,
    FlightDurationGraphComponent,
    FlightListNavigatorComponent,
    PolicySliderComponent,
    SearchForServicesComponent,
    HeadNavigationBarComponent,
    TextOnDemandComponent,
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    HttpClientModule,
    Angular2FontawesomeModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    AccordionModule,
    BrowserAnimationsModule,
    SliderModule,
    DropdownModule,
    CalendarModule,
    CheckboxModule,
    StepsModule,
    ButtonModule,
    OverlayPanelModule,
    DialogModule,
    // AutoCompleteModule,
    BsDropdownModule.forRoot(),
    CollapseModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [
    AppService,
    ApiService,
    LoggerService,
    ObtService,
    FilterService,
    SortByService,
    ExtendInformationService,
    UserService,
    WindowRefService,
    SelectFlightResultService,
    SearchForServicesService,
    TextOnDemandService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
