import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestorAccountsComponent } from './investor-accounts.component';

describe('InvestorAccountsComponent', () => {
  let component: InvestorAccountsComponent;
  let fixture: ComponentFixture<InvestorAccountsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InvestorAccountsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestorAccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
