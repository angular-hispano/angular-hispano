import { AfterViewInit, Component, inject, ViewChild } from '@angular/core';
import {
  MatDrawer,
  MatSidenavContainer,
  MatSidenav,
  MatSidenavContent
} from '@angular/material/sidenav';

import { NavService } from '../nav.service';
import { take } from 'rxjs/operators';
import { MatToolbar } from '@angular/material/toolbar';
import {
  MatNavList,
  MatListItem,
  MatListItemIcon,
  MatListItemTitle,
  MatList,
  MatListSubheaderCssMatStyler
} from '@angular/material/list';
import { RouterLinkActive, RouterLink, RouterOutlet } from '@angular/router';
import { MatIcon } from '@angular/material/icon';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { FooterComponent } from '../footer/footer.component';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
  imports: [
    MatSidenavContainer,
    MatSidenav,
    MatToolbar,
    MatNavList,
    MatListItem,
    RouterLinkActive,
    RouterLink,
    MatIcon,
    MatListItemIcon,
    MatListItemTitle,
    MatList,
    MatListSubheaderCssMatStyler,
    MatSidenavContent,
    TopNavComponent,
    RouterOutlet,
    FooterComponent,
    AsyncPipe
  ]
})
export class NavComponent implements AfterViewInit {
  @ViewChild('drawer', { static: true }) drawer: MatDrawer | undefined;
  public readonly navService = inject(NavService);

  constructor() {}

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
