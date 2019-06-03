import {AfterViewInit, Component, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';

import {NavService} from '../nav.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements AfterViewInit {
  @ViewChild('drawer', {static: true}) drawer: MatDrawer;

  constructor(public navService: NavService) {}

  ngAfterViewInit(): void {
    this.navService.drawer = this.drawer;
  }
}
