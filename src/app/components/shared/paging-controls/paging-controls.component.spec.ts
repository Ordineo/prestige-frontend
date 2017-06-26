import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PagingControlsComponent } from './paging-controls.component';

describe('PagingControlsComponent', () => {
  let component: PagingControlsComponent;
  let fixture: ComponentFixture<PagingControlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PagingControlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PagingControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
