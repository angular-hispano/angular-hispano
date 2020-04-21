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
      name: 'Ng Conf Colombia',
      logoUrl: 'https://ngconf.co/assets/logo-01.png',
      logoType: 'png',
      dateString: '14-15 de agosto, 2020',
      siteUrl: 'https://ngconf.co',
      ticketsUrl: null,
      cfpUrl: null,
      country: 'Colombia',
      city: 'Medellín'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
