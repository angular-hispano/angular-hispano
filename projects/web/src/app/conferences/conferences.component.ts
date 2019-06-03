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
      logoUrl: 'https://ng-bolivia.org/images/logos/ng-bo.png',
      dateString: '23 y 24 de agosto, 2019',
      siteUrl: 'https://ng-bolivia.org/',
      ticketsUrl: undefined,
      cfpUrl:
          'https://docs.google.com/forms/d/e/1FAIpQLSeXyM2y97HYshC8aHAeGOdUOC6Qf2y8yUpyZfNZbB00LtpG_w/viewform?usp=sf_link'
    },
    {
      name: 'ngSpain',
      logoUrl: 'https://ngspain.com/images/logo.svg',
      dateString: '19 y 20 de octubre, 2019',
      siteUrl: 'https://ngspain.com/',
      ticketsUrl: undefined,
      cfpUrl: 'https://forms.gle/87xT2jwdQgCKtTcZA'
    },
    {
      name: 'NG Honduras',
      logoUrl: 'https://ng-honduras.org/images/logo.svg',
      dateString: '18 y 19 de octubre, 2019',
      siteUrl: 'https://ng-honduras.org',
      ticketsUrl: undefined,
      cfpUrl: 'https://docs.google.com/forms/d/e/1FAIpQLSej6MAID9G4DwH1YEFlEZuJK-5mGV3Tzq729XDh-OdEAR6qgQ/viewform'
     }
  ];

  constructor() {}

  ngOnInit() {}
}
