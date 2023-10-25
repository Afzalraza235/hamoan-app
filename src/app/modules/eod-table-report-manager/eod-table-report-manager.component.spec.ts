import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EodTableReportManagerComponent } from './eod-table-report-manager.component';

describe('EodTableReportManagerComponent', () => {
  let component: EodTableReportManagerComponent;
  let fixture: ComponentFixture<EodTableReportManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EodTableReportManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EodTableReportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
