import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TheEndComponent } from './the-end.component';

describe('TheEndComponent', () => {
  let component: TheEndComponent;
  let fixture: ComponentFixture<TheEndComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TheEndComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TheEndComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
