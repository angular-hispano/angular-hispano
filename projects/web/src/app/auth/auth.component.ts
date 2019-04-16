import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthProvider } from 'ngx-auth-firebaseui';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AuthComponent implements OnInit {
  providers = AuthProvider;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onSuccess(event) {
    this.router.navigate(['/']);
  }
}
