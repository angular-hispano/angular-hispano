import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OrganizeMeetupComponent} from './organize-meetup.component';

describe('OrganizeMeetupComponent', () => {
  let component: OrganizeMeetupComponent;
  let fixture: ComponentFixture<OrganizeMeetupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({declarations: [OrganizeMeetupComponent]}).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrganizeMeetupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
