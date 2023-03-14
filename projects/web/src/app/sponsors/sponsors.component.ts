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
      url: 'https://www.devintent.com/',
      alt: 'Logo de DevIntent',
      image: 'devintent-logo.svg'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
