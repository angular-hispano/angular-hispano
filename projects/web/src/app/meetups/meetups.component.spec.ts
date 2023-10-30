import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MeetupsComponent } from './meetups.component';
import { MatLegacyCardModule as MatCardModule } from '@angular/material/legacy-card';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';

describe('MeetupsComponent', () => {
  let component: MeetupsComponent;
  let fixture: ComponentFixture<MeetupsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule, NoopAnimationsModule, RouterTestingModule, HttpClientModule],
      declarations: [MeetupsComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
