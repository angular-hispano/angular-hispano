import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer
} from '@angular/core';
import { getAnalytics } from 'firebase/analytics';
import { FIREBASE_APP } from './firebase-app.token';

export const provideFirebaseAnalytics = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideAppInitializer(() => {
      const app = inject(FIREBASE_APP);
      getAnalytics(app);
    })
  ]);
