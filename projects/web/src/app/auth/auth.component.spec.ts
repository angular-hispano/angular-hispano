import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthComponent } from './auth.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDividerModule } from '@angular/material/divider';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
    imports: [
        NoopAnimationsModule,
        AngularFireModule.initializeApp(environment.firebase),
        RouterTestingModule,
        MatDividerModule,
        AuthComponent
    ]
}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
