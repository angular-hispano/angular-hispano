import { Component } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private angulartics: Angulartics2GoogleGlobalSiteTag) {
    if (environment.production) {
      angulartics.startTracking();
    }
  }
}
