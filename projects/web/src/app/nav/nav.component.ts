import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { NavService } from '../nav.service';
import { MatDrawer } from '@angular/material';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(public navService: NavService) {
  }

  ngAfterViewInit(): void {
    this.navService.drawer = this.drawer;
  }
}
