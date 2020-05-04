import { Component, OnInit } from '@angular/core';
import { Meetup } from './meetup';

@Component({
  selector: 'app-meetups',
  templateUrl: './meetups.component.html',
  styleUrls: ['./meetups.component.scss']
})
export class MeetupsComponent implements OnInit {
  meetings: Meetup[] = [
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
    },
    {
      name: 'Angular Bogotá',
      city: 'Bogotá',
      country: 'Colombia',
      logoUrl: 'assets/meetups/angular-bog.jpg',
      logoType: 'jpg',
      meetupUrl: 'https://www.meetup.com/es-ES/Angular-Bogota/'
    },
    {
      name: 'Angular Quito',
      city: 'Quito',
      country: 'Ecuador',
      logoUrl: 'assets/meetups/angular-quito.png',
      logoType: 'png',
      meetupUrl: 'https://www.meetup.com/es/angularQuito/'
    },
    {
      name: 'Angular Dominicana',
      city: 'Santo Domingo',
      country: 'República Dominicana',
      logoUrl: 'assets/meetups/ng-dominican.svg',
      logoType: 'svg',
      meetupUrl: 'https://www.twitter.com/ngdominican'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
