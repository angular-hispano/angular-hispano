import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { OrganizeMeetupComponent } from './organize-meetup.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('OrganizeMeetupComponent', () => {
  let component: OrganizeMeetupComponent;
  let fixture: ComponentFixture<OrganizeMeetupComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        imports: [
          HttpClientModule,
          RouterTestingModule,
          NgxAuthFirebaseUIModule.forRoot(environment.firebase),
          NoopAnimationsModule,
          MatIconModule
        ],
        declarations: [OrganizeMeetupComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
