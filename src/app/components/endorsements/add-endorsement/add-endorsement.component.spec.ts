/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AddEndorsementComponent } from './add-prestige.component';

describe('AddPrestigeComponent', () => {
  let component: AddEndorsementComponent;
  let fixture: ComponentFixture<AddEndorsementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddEndorsementComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEndorsementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
