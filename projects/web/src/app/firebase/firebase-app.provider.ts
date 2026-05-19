import { EnvironmentProviders, makeEnvironmentProviders } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { FIREBASE_APP } from './firebase-app.token';
import { environment } from '../../environments/environment';

export const provideFirebaseApp = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    {
      provide: FIREBASE_APP,
      useFactory: () => initializeApp(environment.firebase),
    },
  ]);