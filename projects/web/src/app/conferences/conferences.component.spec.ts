import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ConferencesComponent } from './conferences.component';
import { MatIconModule } from '@angular/material/icon';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
import { environment } from '../../environments/environment';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { RouterTestingModule } from '@angular/router/testing';

describe('ConferencesComponent', () => {
  let component: ConferencesComponent;
  let fixture: ComponentFixture<ConferencesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatCardModule,
        NgxAuthFirebaseUIModule.forRoot(environment.firebase),
        NoopAnimationsModule,
        MatButtonModule,
        RouterTestingModule
      ],
      declarations: [ConferencesComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConferencesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
