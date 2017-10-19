import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobAccordianComponent } from './job-accordian.component';

describe('JobAccordianComponent', () => {
  let component: JobAccordianComponent;
  let fixture: ComponentFixture<JobAccordianComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobAccordianComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobAccordianComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
