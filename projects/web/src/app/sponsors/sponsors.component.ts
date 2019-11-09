import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sponsors',
  templateUrl: './sponsors.component.html',
  styleUrls: ['./sponsors.component.scss']
})
export class SponsorsComponent implements OnInit {
  // TODO consider eventually moving this to Firebase
  public sponsors = [
    {
      url: 'https://cloud.google.com/',
      alt: 'Logo de Google Cloud',
      image: 'google-cloud-platform.svg'
    },
    {
      url: 'https://www.devintent.com/',
      alt: 'Logo de DevIntent',
      image: 'DevIntentLogo_40h.png'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
