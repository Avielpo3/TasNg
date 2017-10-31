import { Component, OnInit } from '@angular/core';
import { FilterComponent } from './filter.component';


/**
 * The logic is inside FilterComponent
 * The style is the same as filter.component.scss
 * @export
 * @class FilterPriceComponent
 * @extends {FilterComponent}
 * @implements {OnInit}
 */
@Component({
    selector: 'app-filter-price',
    templateUrl: './filter-price.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterPriceComponent extends FilterComponent implements OnInit {
}
