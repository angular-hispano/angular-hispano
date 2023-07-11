import { Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { MatLegacySnackBar as MatSnackBar } from '@angular/material/legacy-snack-bar';
import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  private START_CHECK_FOR_UPDATE = 5000; // milliseconds
  private CHECK_FOR_UPDATE_INTERVAL = 1000 * 60 * 60; // 60 minutes

  constructor(private swUpdate: SwUpdate, snackBar: MatSnackBar) {
    swUpdate.available
      .pipe(
        mergeMap((event: UpdateAvailableEvent) => {
          console.log('La versión actual de la aplicación es: ', event.current);
          console.log('La versión de la aplicación disponible es: ', event.available);
          return snackBar.open('Hay una versión nueva disponible', 'ACTUALIZAR', {}).onAction();
        })
      )
      .subscribe(() => {
        swUpdate.activateUpdate().then(() => document.location.reload());
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
