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
      name: 'Angular Bolivia',
      city: 'Cochabamba',
      country: 'Bolivia',
      logoUrl: 'assets/meetups/angular-bolivia.jpg',
      logoType: 'jpg',
      meetupUrl: 'https://www.meetup.com/Angular-Bolivia/'
    },
    {
      name: 'Angular Chile',
      city: 'Chile',
      country: 'Chile',
      logoUrl: 'assets/meetups/angular-chile.jpg',
      logoType: 'jpg',
      meetupUrl: 'https://twitter.com/angularChile'
    },
    {
      name: 'Angular Costa Rica',
      city: 'Costa Rica',
      country: 'Costa Rica',
      logoUrl: 'assets/meetups/angular-costarica.png',
      logoType: 'png',
      meetupUrl: 'https://www.meetup.com/gdg-costarica/'
    },
    {
      name: 'Angular Honduras',
      city: 'San Pedro Sula',
      country: 'Honduras',
      logoUrl: 'assets/meetups/angular-honduras.svg',
      logoType: 'svg',
      meetupUrl: 'https://twitter.com/AngularHonduras'
    },
    {
      name: 'Angular Málaga',
      city: 'Málaga',
      country: 'España',
      logoUrl: 'assets/meetups/angular-malaga.png',
      logoType: 'png',
      meetupUrl: 'https://www.meetup.com/es-ES/Angular-Malaga/'
    },
    {
      name: 'Angular MVD',
      city: 'Montevideo',
      country: 'Uruguay',
      logoUrl: 'assets/meetups/angular-montevideo.png',
      logoType: 'png',
      meetupUrl: 'https://www.meetup.com/Angular-MVD/'
    },
    {
      name: 'ngVenezuela',
      city: 'Venezuela',
      country: 'Venezuela',
      logoUrl: 'assets/meetups/angular-venezuela.png',
      logoType: 'png',
      meetupUrl: 'https://twitter.com/ngVenezuela'
    },
    {
      name: 'NgGuayaquil',
      city: 'Guayaquil',
      country: 'Ecuador',
      logoUrl: 'assets/meetups/ng-guayaquil.png',
      logoType: 'png',
      meetupUrl: 'https://www.eventbrite.com/o/ngguayaquil-28192263023'
    },
    {
      name: 'NgPanama',
      city: 'Panamá',
      country: 'Panamá',
      logoUrl: 'assets/meetups/ngPanama.png',
      logoType: 'png',
      meetupUrl: 'https://twitter.com/NgPanama'
    },
    {
      name: 'Angular Bahía',
      city: 'Salvador',
      country: 'Brazil',
      logoUrl: 'assets/meetups/angular-bahia.jpg',
      logoType: 'jpg',
      meetupUrl: 'https://twitter.com/AngularBA'
    }
  ];
  constructor() {}

  ngOnInit(): void {}
}
