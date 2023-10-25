import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlobalExposureManagerComponent } from './global-exposure-manager.component';

describe('GlobalExposureManagerComponent', () => {
  let component: GlobalExposureManagerComponent;
  let fixture: ComponentFixture<GlobalExposureManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GlobalExposureManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GlobalExposureManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
