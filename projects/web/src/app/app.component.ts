import { Component, inject } from '@angular/core';
import { environment } from '../environments/environment';
import { SwUpdateService } from './sw-update.service';
import { NavComponent } from './nav/nav.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [NavComponent]
})
export class AppComponent {
  private readonly swUpdateService = inject(SwUpdateService);
  constructor() {
    if (environment.production) {
      this.swUpdateService.checkForUpdate();
    }
  }
}
