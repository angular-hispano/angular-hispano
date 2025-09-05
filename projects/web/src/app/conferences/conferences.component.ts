import { Component } from '@angular/core';
import { Conference } from './conference';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatCardActions,
  MatCardContent
} from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    NgClass,
    MatCardActions,
    MatTooltip,
    MatCardContent,
    MatButtonModule
  ]
})
export class ConferencesComponent {
  conferences: Conference[] = [
    {
      country: 'Perú',
      city: 'Lima',
      name: 'NgConf Perú 2025',
      logoUrl: 'https://ngconf.angular-peru.com/angular-logo.png',
      logoType: 'png',
      dateString: '2025-09-06',
      siteUrl: 'https://ngconf.angular-peru.com/',
      ticketsUrl: 'https://ngconf.angular-peru.com/',
      cfpUrl: 'https://sessionize.com/ng-conf-peru-2025/'
    }
  ];
}
