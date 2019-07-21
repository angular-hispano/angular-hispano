import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {MatIconModule, MatToolbarModule} from '@angular/material';

import {TopNavComponent} from './top-nav.component';

describe('NavSuperiorComponent', () => {
  let component: TopNavComponent;
  let fixture: ComponentFixture<TopNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MatIconModule, MatToolbarModule],
      declarations: [TopNavComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TopNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
