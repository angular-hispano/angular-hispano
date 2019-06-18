import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GuideOfMeetupsComponent } from './guide-of-meetups.component';

describe('GuideOfMeetupsComponent', () => {
  let component: GuideOfMeetupsComponent;
  let fixture: ComponentFixture<GuideOfMeetupsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuideOfMeetupsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuideOfMeetupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
