import { enableProdMode, importProvidersFrom } from '@angular/core';

import { environment } from './environments/environment';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import {
  withPreloading,
  withInMemoryScrolling,
  provideRouter,
  PreloadAllModules
} from '@angular/router';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';
import { AngularFirePerformanceModule } from '@angular/fire/compat/performance';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ServiceWorkerModule } from '@angular/service-worker';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    importProvidersFrom(
      BrowserModule,
      CommonModule,
      AngularFireModule.initializeApp(environment.firebase),
      AngularFireAnalyticsModule,
      AngularFirePerformanceModule,
      LayoutModule,
      MatToolbarModule,
      MatButtonModule,
      MatSidenavModule,
      MatSnackBarModule,
      MatIconModule,
      MatListModule,
      MatCardModule,
      MatTooltipModule,
      ServiceWorkerModule.register('ngsw-worker.js', {
        enabled: environment.production,
        // Workaround, debido a que hay un bug con el modulo de AngularFirePerformanceModule
        // el service worker se va registrar apenas inicie el app
        // Referencia: https://github.com/angular/angularfire2/issues/2110
        registrationStrategy: 'registerWithDelay:5000'
      })
    ),
    provideAnimations(),
    provideRouter(
      routes,
      withPreloading(PreloadAllModules),
      withInMemoryScrolling({ scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled' })
    )
  ]
}).catch(err => console.error(err));
