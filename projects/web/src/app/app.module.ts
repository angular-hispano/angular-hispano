import { LayoutModule } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirePerformanceModule } from '@angular/fire/compat/performance';
import { MatLegacyButtonModule as MatButtonModule } from '@angular/material/legacy-button';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { MatIconModule } from '@angular/material/icon';
import { MatLegacyListModule as MatListModule } from '@angular/material/legacy-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatLegacyTooltipModule as MatTooltipModule } from '@angular/material/legacy-tooltip';
import { MatLegacySnackBarModule as MatSnackBarModule } from '@angular/material/legacy-snack-bar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ServiceWorkerModule } from '@angular/service-worker';

import { environment } from '../environments/environment';

import { AppComponent } from './app.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { NavComponent } from './nav/nav.component';
import { OrganizeMeetupComponent } from './organize-meetup/organize-meetup.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { MeetupsComponent } from './meetups/meetups.component';
import { AuthComponent } from './auth/auth.component';
import { AngularFireAnalyticsModule } from '@angular/fire/compat/analytics';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'acerca' },
  { path: 'acerca', component: LandingComponent, children: [] },
  { path: 'auth', component: AuthComponent, children: [] },
  { path: 'coc', component: CodeOfConductComponent, children: [] },
  { path: 'conferencias', component: ConferencesComponent, children: [] },
  { path: 'organizar/meetup', component: OrganizeMeetupComponent, children: [] },
  { path: 'meetups', component: MeetupsComponent, children: [] },
  { path: '**', component: PageNotFoundComponent, children: [] }
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    PageNotFoundComponent,
    TopNavComponent,
    AuthComponent,
    CodeOfConductComponent,
    SponsorsComponent,
    ConferencesComponent,
    FooterComponent,
    OrganizeMeetupComponent,
    MeetupsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes, {
      useHash: false,
      preloadingStrategy: PreloadAllModules,
      scrollPositionRestoration: 'enabled',
      anchorScrolling: 'enabled'
    }),
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
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
