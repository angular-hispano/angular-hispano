import { Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { SponsorsComponent } from '../sponsors/sponsors.component';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss'],
  imports: [MatButton, MatIcon, SponsorsComponent]
})
export class LandingComponent {}
