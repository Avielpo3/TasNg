import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-head-navigation-bar',
  templateUrl: './head-navigation-bar.component.html',
  styleUrls: ['./head-navigation-bar.component.scss']
})
export class HeadNavigationBarComponent implements OnInit {

  isCollapsed = true;

  constructor() { }

  toggleMenu() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {
  }

}
