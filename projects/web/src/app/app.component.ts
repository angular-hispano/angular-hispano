import { Component } from '@angular/core';
import { environment } from '../environments/environment';
import { SwUpdateService } from './sw-update.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private swUpdateService: SwUpdateService) {
    if (environment.production) {
      this.swUpdateService.checkForUpdate();
    }
  }
}
