import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TradingHistoryReportManagerComponent } from './trading-history-report-manager.component';

describe('TradingHistoryReportManagerComponent', () => {
  let component: TradingHistoryReportManagerComponent;
  let fixture: ComponentFixture<TradingHistoryReportManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TradingHistoryReportManagerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TradingHistoryReportManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
