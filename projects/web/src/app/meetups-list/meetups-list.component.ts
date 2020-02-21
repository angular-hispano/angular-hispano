import { Component, OnInit } from '@angular/core';
import { Meeting } from './meeting';

@Component({
  selector: 'app-meetups-list',
  templateUrl: './meetups-list.component.html',
  styleUrls: ['./meetups-list.component.scss']
})
export class MeetupsListComponent implements OnInit {
  meetings: Meeting[] = [
    {
      name: 'NG-BAIRES',
      city: 'Buenos Aires',
      country: 'Argentina',
      logoUrl: null,
      logoType: 'png',
      meetupUrl: 'https://www.meetup.com/es-ES/NG-BAIRES/'
    },
    {
      name: 'She Codes Angular',
      city: 'Medellín',
      country: 'Colombia',
      logoUrl: null,
      logoType: 'png',
      meetupUrl: 'http://meetu.ps/c/4c8yM/bykrj/d'
    },
    {
      name: 'Angular Medellín',
      city: 'Medellín',
      country: 'Colombia',
      logoUrl: 'assets/meetups/angular-med.png',
      logoType: 'png',
      meetupUrl: 'https://www.meetup.com/es-ES/Angular-Medellin/'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
