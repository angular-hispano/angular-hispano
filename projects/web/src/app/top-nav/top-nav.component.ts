import { Component } from '@angular/core';
import { NavService } from '../nav.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent {
  constructor(public navService: NavService, public auth: AngularFireAuth) {}
}
