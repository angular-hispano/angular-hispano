import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';
import {
  MatToolbarModule, MatButtonModule, MatSidenavModule, MatIconModule, MatListModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { Angulartics2Module } from 'angulartics2';
import { AngularFireModule } from '@angular/fire';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { TopNavComponent } from './top-nav/top-nav.component';
import { LandingComponent } from './landing/landing.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { SponsorsComponent } from './sponsors/sponsors.component';

const routes: Routes = [
  {path: '', pathMatch: 'full', redirectTo: 'acerca'},
  {path: 'acerca', component: LandingComponent, children: []},
  {path: 'coc', component: CodeOfConductComponent, children: []},
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
    SponsorsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    RouterModule.forRoot(routes, {useHash: false, preloadingStrategy: PreloadAllModules }),
    AngularFireModule.initializeApp(environment.firebase),
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
