import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { CodeOfConductComponent } from './code-of-conduct.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('CodeOfConductComponent', () => {
  let component: CodeOfConductComponent;
  let fixture: ComponentFixture<CodeOfConductComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        RouterTestingModule,
        NoopAnimationsModule,
        MatIconModule,
        CodeOfConductComponent
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeOfConductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
