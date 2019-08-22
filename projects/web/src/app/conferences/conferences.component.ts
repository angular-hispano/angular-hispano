import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  conferences = [
    {
      name: 'NG Bolivia',
      logoUrl: 'assets/ng-bo.png',
      logoType: 'png',
      dateString: '23 y 24 de agosto, 2019',
      siteUrl: 'https://ng-bolivia.org/',
      ticketsUrl: 'https://ti.to/angular-bolivia/2019/',
      cfpUrl: null,
      country: 'Bolivia',
      city: 'Cochabamba'
    },
    {
      name: 'NG Honduras',
      logoUrl: 'https://ng-honduras.org/images/logo.svg',
      logoType: 'svg',
      dateString: '18 y 19 de octubre, 2019',
      siteUrl: 'https://ng-honduras.org',
      ticketsUrl: 'https://www.eventbrite.es/e/entradas-ng-honduras-2019-62088406094',
      cfpUrl: null,
      country: 'Honduras',
      city: 'San Pedro Sula'
    },
    {
      name: 'ngSpain',
      logoUrl: 'https://ngspain.com/images/logo.svg',
      logoType: 'svg',
      dateString: '19 y 20 de octubre, 2019',
      siteUrl: 'https://ngspain.com/',
      ticketsUrl: 'https://ti.to/ngspain/2019',
      cfpUrl: null,
      country: 'España',
      city: 'Madrid'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
