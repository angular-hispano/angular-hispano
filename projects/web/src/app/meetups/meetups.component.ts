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
      name: 'She Codes Angular',
      city: 'Medellín',
      country: 'Colombia',
      logoUrl: 'assets/meetups/she-codes-angular.jpg',
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
      name: 'NG-BAIRES',
      city: 'Buenos Aires',
      country: 'Argentina',
      logoUrl: 'assets/meetups/ng-baires.png',
      logoType: 'png',
      meetupUrl: 'https://twitter.com/ngbaires'
    },
    {
      name: 'NgGuayaquil',
      city: 'Guayaquil',
      country: 'Ecuador',
      logoUrl: 'assets/meetups/ng-guayaquil.png',
      logoType: 'png',
      meetupUrl: 'https://www.eventbrite.com/o/ngguayaquil-28192263023'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
