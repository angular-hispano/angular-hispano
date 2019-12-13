import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Injectable } from '@angular/core';
import { MatDrawer, MatDrawerToggleResult } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { FocusOrigin } from '@angular/cdk/a11y';

@Injectable({ providedIn: 'root' })
export class NavService {
  private _drawer: MatDrawer | undefined;
  public get drawer(): MatDrawer | undefined {
    return this._drawer;
  }

  public isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay(1)
    );

  constructor(private breakpointObserver: BreakpointObserver) {}

  public setDrawer(value: MatDrawer) {
    this._drawer = value;
  }

  public closeDrawer(): Promise<MatDrawerToggleResult> | null {
    if (this.drawer) {
      return this.drawer.close();
    }
    return null;
  }

  public toggleDrawer(
    isOpen?: boolean,
    openedVia?: FocusOrigin
  ): Promise<MatDrawerToggleResult> | null {
    if (this.drawer) {
      return this.drawer.toggle(isOpen, openedVia);
    }
    return null;
  }
}
