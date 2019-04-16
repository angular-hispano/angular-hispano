import { Component } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { environment } from '../environments/environment';
import '../../third-party/performance';
import { FirebaseApp } from '@angular/fire';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private angulartics: Angulartics2GoogleGlobalSiteTag,
              private firebaseApp: FirebaseApp) {
    if (environment.production) {
      // @ts-ignore
      firebaseApp.performance();
      angulartics.startTracking();
    }
  }
}
