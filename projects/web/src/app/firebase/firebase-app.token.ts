import { InjectionToken } from '@angular/core';
import type { FirebaseApp } from 'firebase/app';

export const FIREBASE_APP = new InjectionToken<FirebaseApp>('FIREBASE_APP');
