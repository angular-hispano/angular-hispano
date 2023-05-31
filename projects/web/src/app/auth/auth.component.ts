import { Component, ViewEncapsulation } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent {
  providers = AuthProvider;

  constructor(private router: Router) {}

  onSuccess(event: any) {
    this.router.navigate(['/']);
  }

  onError(event: any) {
    console.error(event);
  }
}
