import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import {Injectable} from '@angular/core';
import {MatDrawer} from '@angular/material/sidenav';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class NavService {
  public isHandset$: Observable<boolean> =
      this.breakpointObserver.observe(Breakpoints.Handset).pipe(map(result => result.matches));
  private _drawer: MatDrawer;

  constructor(private breakpointObserver: BreakpointObserver) {}

  public get drawer(): MatDrawer {
    return this._drawer;
  }

  public set drawer(value: MatDrawer) {
    this._drawer = value;
  }
}
