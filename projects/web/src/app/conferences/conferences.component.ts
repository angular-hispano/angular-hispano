import { Component } from '@angular/core';
import { Conference } from './conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent {
  conferences: Conference[] = [];
}
