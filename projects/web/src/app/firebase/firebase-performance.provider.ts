import {
  EnvironmentProviders,
  inject,
  makeEnvironmentProviders,
  provideAppInitializer
} from '@angular/core';
import { getPerformance } from 'firebase/performance';
import { FIREBASE_APP } from './firebase-app.token';

export const provideFirebasePerformance = (): EnvironmentProviders =>
  makeEnvironmentProviders([
    provideAppInitializer(() => {
      const app = inject(FIREBASE_APP);
      getPerformance(app);
    })
  ]);
