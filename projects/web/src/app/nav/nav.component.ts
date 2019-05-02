import { AfterViewInit, Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { NavService } from '../nav.service';
import { MatDrawer } from '@angular/material/sidenav';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavComponent implements AfterViewInit {
  @ViewChild('drawer') drawer: MatDrawer;

  constructor(public navService: NavService) {
  }

  ngAfterViewInit(): void {
    this.navService.drawer = this.drawer;
  }
}
