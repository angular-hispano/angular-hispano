import { Injectable } from '@angular/core';
import { timer } from 'rxjs';
import { SwUpdate } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private START_CHECK_FOR_UPDATE = 5000; // milliseconds
  private CHECK_FOR_UPDATE_INTERVAL = 1000 * 60 * 60; // 60 mins

  constructor(private swUpdate: SwUpdate, private snackBar: MatSnackBar) {}

  checkForUpdate() {
    timer(this.START_CHECK_FOR_UPDATE, this.CHECK_FOR_UPDATE_INTERVAL).subscribe(() =>
      this.swUpdate.checkForUpdate()
    );
    this.swUpdate.available.subscribe(event => {
      this.snackBar
        .open('Hay una versión nueva disponible', 'ACTUALIZAR')
        .onAction()
        .subscribe(() => this.swUpdate.activateUpdate().then(() => document.location.reload()));
    });
  }
}
