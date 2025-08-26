import { Component } from '@angular/core';
import { Conference } from './conference';
import {
  MatCard,
  MatCardHeader,
  MatCardTitle,
  MatCardSubtitle,
  MatCardImage,
  MatCardActions,
  MatCardContent
} from '@angular/material/card';
import { NgClass } from '@angular/common';
import { MatTooltip } from '@angular/material/tooltip';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-conferences',
  templateUrl: './conferences.component.html',
  styleUrls: ['./conferences.component.scss'],
  imports: [
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardSubtitle,
    MatCardImage,
    NgClass,
    MatCardActions,
    MatTooltip,
    MatCardContent,
    MatButtonModule
  ]
})
export class ConferencesComponent {
  conferences: Conference[] = [];
}
