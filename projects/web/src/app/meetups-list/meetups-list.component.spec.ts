import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetupsListComponent } from './meetups-list.component';

describe('MeetupsListComponent', () => {
  let component: MeetupsListComponent;
  let fixture: ComponentFixture<MeetupsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MeetupsListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetupsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
