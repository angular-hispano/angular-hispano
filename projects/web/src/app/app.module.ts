import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';
import { AngularFireModule } from '@angular/fire';
import { AngularFirePerformanceModule } from '@angular/fire/performance';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { SponsorsComponent } from './sponsors/sponsors.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { FooterComponent } from './footer/footer.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'acerca'},
  {path: 'acerca', component: LandingComponent, children: []},
  {path: 'coc', component: CodeOfConductComponent, children: []},
  {path: 'conferences', component: ConferencesComponent, children: []},
  {path: '**', component: PageNotFoundComponent, children: []}
];

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    LandingComponent,
    PageNotFoundComponent,
    TopNavComponent,
    CodeOfConductComponent,
    SponsorsComponent,
    ConferencesComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes, {useHash: false, preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirePerformanceModule,
    Angulartics2Module.forRoot(),
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
