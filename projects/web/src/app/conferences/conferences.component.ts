import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss']
})
export class ConferencesComponent implements OnInit {
  conferences = [
    {
      name: 'NG Honduras',
      logoUrl: 'https://ng-honduras.org/images/logo.svg',
      logoType: 'svg',
      dateString: '28 de febrero, 2020',
      siteUrl: 'https://ng-honduras.org',
      ticketsUrl: 'https://www.eventbrite.es/e/entradas-ng-honduras-2020-62088406094',
      cfpUrl: null,
      country: 'Honduras',
      city: 'San Pedro Sula'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
