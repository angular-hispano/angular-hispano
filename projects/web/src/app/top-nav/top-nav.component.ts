import { Component, inject } from '@angular/core';
import { NavService } from '../nav.service';
import { MatToolbar } from '@angular/material/toolbar';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-top-nav',
  templateUrl: './top-nav.component.html',
  styleUrls: ['./top-nav.component.scss'],
  imports: [MatToolbar, MatIconButton, MatIcon, AsyncPipe]
})
export class TopNavComponent {
  public readonly navService = inject(NavService);
  constructor() {}
}
