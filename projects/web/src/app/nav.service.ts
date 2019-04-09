import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { map } from 'rxjs/operators';
import { MatDrawer } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class NavService {
  public isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
  .pipe(
    map(result => result.matches)
  );
  private _drawer: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver) {
  }

  public get drawer(): MatDrawer {
    return this._drawer;
  }

  public set drawer(value: MatDrawer) {
    this._drawer = value;
  }
}
