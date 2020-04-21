import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MeetupsComponent } from './meetups.component';
import { MatCardModule } from '@angular/material/card';

describe('MeetupsComponent', () => {
  let component: MeetupsComponent;
  let fixture: ComponentFixture<MeetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatCardModule],
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
