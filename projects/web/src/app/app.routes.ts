import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { AuthComponent } from './auth/auth.component';
import { CodeOfConductComponent } from './code-of-conduct/code-of-conduct.component';
import { ConferencesComponent } from './conferences/conferences.component';
import { OrganizeMeetupComponent } from './organize-meetup/organize-meetup.component';
import { MeetupsComponent } from './meetups/meetups.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'acerca' },
  { path: 'acerca', component: LandingComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'coc', component: CodeOfConductComponent },
  { path: 'conferencias', component: ConferencesComponent },
  { path: 'organizar/meetup', component: OrganizeMeetupComponent },
  { path: 'meetups', component: MeetupsComponent },
  { path: '**', component: PageNotFoundComponent }
];
