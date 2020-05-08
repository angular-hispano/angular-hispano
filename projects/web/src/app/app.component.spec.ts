import { async, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Angulartics2Module } from 'angulartics2';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

import { routes } from './app.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { FooterComponent } from './footer/footer.component';
import { LandingComponent } from './landing/landing.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { OrganizeMeetupComponent } from './organize-meetup/organize-meetup.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule.withRoutes(routes),
        HttpClientModule,
        AngularFireModule.initializeApp(environment.firebase),
        NgxAuthFirebaseUIModule.forRoot(environment.firebase),
        MatSidenavModule,
        MatToolbarModule,
        MatIconModule,
        MatListModule,
        MatCardModule,
        MatSnackBarModule,
        Angulartics2Module.forRoot(),
        ServiceWorkerModule.register('', { enabled: false })
      ],
      declarations: [
        AppComponent,
        NavComponent,
        TopNavComponent,
        FooterComponent,
        LandingComponent,
        CodeOfConductComponent,
        OrganizeMeetupComponent,
        ConferencesComponent,
        PageNotFoundComponent,
        SponsorsComponent
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have an app-nav element'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('app-nav')).toBeTruthy();
  });
});
