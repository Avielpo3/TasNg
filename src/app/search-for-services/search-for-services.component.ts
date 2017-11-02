import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-for-services',
  templateUrl: './search-for-services.component.html',
  styleUrls: ['./search-for-services.component.scss']
})
export class SearchForServicesComponent implements OnInit {

  constructor(private _router: Router) { }

  ngOnInit() {
  }

  navigateToNext(): void {
    // TODO: Change method name. change logic.
    this._router.navigate(['wait-for-results']);
  }

}
