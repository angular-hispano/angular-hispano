import { Component, OnInit } from '@angular/core';
import { Conference } from './conference';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  conferences: Conference[] = [
    {
      name: 'NG Honduras',
      logoUrl: 'assets/ng-honduras-logo.svg',
      logoType: 'svg',
      dateString: '28-29 de febrero, 2020',
      siteUrl: 'https://ng-honduras.org',
      ticketsUrl: 'https://www.eventbrite.es/e/entradas-ng-honduras-2020-62088406094',
      cfpUrl: null,
      country: 'Honduras',
      city: 'San Pedro Sula'
    },
    {
      name: 'Ng Conf Colombia',
      logoUrl: 'https://ngconf.co/assets/logo-01.png',
      logoType: 'png',
      dateString: '14-15 de agosto, 2020',
      siteUrl: 'https://ngconf.co',
      ticketsUrl: null,
      cfpUrl: null,
      country: 'Colombia',
      city: 'Medellín'
    },
    {
      name: 'ngSpain',
      logoUrl: 'https://ngspain.com/images/logo.svg',
      logoType: 'svg',
      dateString: 'octubre, 2020',
      siteUrl: 'https://ngspain.com',
      ticketsUrl: null,
      cfpUrl: null,
      country: 'España',
      city: 'Málaga'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
