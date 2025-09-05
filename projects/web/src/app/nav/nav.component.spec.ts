import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { LayoutModule } from '@angular/cdk/layout';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { NavComponent } from './nav.component';
import { TopNavComponent } from '../top-nav/top-nav.component';
import { FooterComponent } from '../footer/footer.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from '../../environments/environment';
import { HttpClientModule } from '@angular/common/http';

describe('NavComponent', () => {
  let component: NavComponent;
  let fixture: ComponentFixture<NavComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        HttpClientModule,
        LayoutModule,
        AngularFireModule.initializeApp(environment.firebase),
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        NavComponent,
        TopNavComponent,
        FooterComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
