import { Component } from '@angular/core';
import { Angulartics2GoogleGlobalSiteTag } from 'angulartics2/gst';
import { environment } from '../environments/environment';
import { SwUpdateService } from './sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(
    private angulartics: Angulartics2GoogleGlobalSiteTag,
    private swUpdateService: SwUpdateService
  ) {
    if (environment.production) {
      angulartics.startTracking();
      this.swUpdateService.checkForUpdate();
    }
  }
}
