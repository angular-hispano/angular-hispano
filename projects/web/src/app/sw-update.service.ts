import { Injectable } from '@angular/core';
import { SwUpdate, VersionReadyEvent } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { timer } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';
import { inject } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private swUpdate = inject(SwUpdate);
  private snackBar = inject(MatSnackBar);
  private START_CHECK_FOR_UPDATE = 5000; // milliseconds
  private CHECK_FOR_UPDATE_INTERVAL = 1000 * 60 * 60; // 60 minutes

  constructor() {
    this.swUpdate.versionUpdates
      .pipe(
        filter((evt): evt is VersionReadyEvent => evt.type === 'VERSION_READY'),
        mergeMap((event: VersionReadyEvent) => {
          console.log('La versión actual de la aplicación es: ', event.currentVersion);
          console.log('La versión de la aplicación disponible es: ', event.latestVersion);
          return this.snackBar
            .open('Hay una versión nueva disponible', 'ACTUALIZAR', {})
            .onAction();
        })
      )
      .subscribe(() => {
        this.swUpdate.activateUpdate().then(() => document.location.reload());
      });
  }

  checkForUpdate() {
    if (this.swUpdate) {
      timer(this.START_CHECK_FOR_UPDATE, this.CHECK_FOR_UPDATE_INTERVAL).subscribe(() => {
        console.log('Comprobando la actualización del sitio del servidor...');
        this.swUpdate
          .checkForUpdate()
          .then(() => console.log('Verificación de actualización del sitio completa.'))
          .catch(error => console.error(`La actualización del sitio falló: ${error}`));
      });
    } else {
      setTimeout(this.checkForUpdate, 1000);
    }
  }
}
