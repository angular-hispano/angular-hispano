import { Component } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { environment } from '../environments/environment';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { timer } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private START_CHECK_FOR_UPDATE = 1000; // 1 second
  private CHECK_FOR_UPDATE_EVERY_FIVE_MINS = 1000 * 60 * 5; // 5 mins

  constructor(
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    private updates: SwUpdate,
    private snackBar: MatSnackBar
  ) {
    if (environment.production) {
      angulartics.startTracking();
      this.checkfAppUpdates();
    }
  }

  private checkfAppUpdates() {
    if ('serviceWorker' in navigator) {
      timer(this.START_CHECK_FOR_UPDATE, this.CHECK_FOR_UPDATE_EVERY_FIVE_MINS).subscribe(() =>
        this.updates.checkForUpdate()
      );
      this.updates.available.subscribe(event => {
        this.snackBar
          .open('Hay una versión nueva disponible', 'ACTUALIZAR')
          .onAction()
          .subscribe(() => this.updates.activateUpdate().then(() => document.location.reload()));
      });
    }
  }
}
