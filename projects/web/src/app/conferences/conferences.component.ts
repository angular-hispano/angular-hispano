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
      dateString: '23 y 24 de agosto, 2019',
      siteUrl: 'https://ng-bolivia.org/',
      ticketsUrl: null,
      cfpUrl: null,
      country: 'Bolivia',
      city: 'Cochabamba,'
    },
    {
      name: 'NG Honduras',
      logoUrl: 'https://ng-honduras.org/images/logo.svg',
      dateString: '18 y 19 de octubre, 2019',
      siteUrl: 'https://ng-honduras.org',
      ticketsUrl: null,
      cfpUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSej6MAID9G4DwH1YEFlEZuJK-5mGV3Tzq729XDh-OdEAR6qgQ/viewform',
      country: 'Honduras',
      city: 'San Pedro Sula,'
    },
    {
      name: 'ngSpain',
      logoUrl: 'https://ngspain.com/images/logo.svg',
      dateString: '19 y 20 de octubre, 2019',
      siteUrl: 'https://ngspain.com/',
      ticketsUrl: null,
      cfpUrl: null,
      country: 'España',
      city: 'Madrid,'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
