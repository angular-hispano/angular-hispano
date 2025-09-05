import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';

import { LandingComponent } from './landing.component';
import { SponsorsComponent } from '../sponsors/sponsors.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';

describe('LandingComponent', () => {
  let component: LandingComponent;
  let fixture: ComponentFixture<LandingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule,
        HttpClientModule,
        MatIconModule,
        LandingComponent,
        SponsorsComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
