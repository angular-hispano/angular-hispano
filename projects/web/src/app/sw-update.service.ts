import { Injectable } from '@angular/core';
import { SwUpdate, UpdateAvailableEvent } from '@angular/service-worker';
import { MatSnackBar } from '@angular/material/snack-bar';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class SwUpdateService {
  constructor(swUpdate: SwUpdate, snackBar: MatSnackBar) {
    swUpdate.available
      .pipe(
        map((event: UpdateAvailableEvent) => {
          console.log('La versión actual de la aplicación es: ', event.current);
          console.log('La versión de la aplicación disponible es: ', event.available);
          return snackBar.open('Hay una versión nueva disponible', 'ACTUALIZAR', {}).onAction();
        })
      )
      .subscribe(() => {
        swUpdate.activateUpdate().then(() => document.location.reload());
      });
  }
}
