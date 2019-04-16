import { Component, OnInit } from '@angular/core';
import { NavService } from '../nav.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss']
})
export class TopNavComponent implements OnInit {
  constructor(public navService: NavService,
              public auth: AngularFireAuth) {}

  ngOnInit() {}
}
