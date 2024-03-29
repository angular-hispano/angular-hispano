import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { MatDrawer } from '@angular/material/sidenav';

import { NavService } from '../nav.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements AfterViewInit {
  @ViewChild('drawer', { static: true }) drawer: MatDrawer | undefined;

  constructor(public navService: NavService) {}

  ngAfterViewInit(): void {
    if (this.drawer) {
      this.navService.setDrawer(this.drawer);
    }
  }

  onNavigation() {
    // Check display size so that we don't close a locked open sidenav on larger displays
    this.navService.isHandset.pipe(take(1)).subscribe((isHandset: boolean) => {
      // Need to close an 'over' mode sidenav, used on mobile.
      if (isHandset) {
        this.navService.closeDrawer();
      }
    });
  }
}
