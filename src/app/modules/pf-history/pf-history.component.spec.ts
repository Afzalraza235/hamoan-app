import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PfHistoryComponent } from './pf-history.component';

describe('PfHistoryComponent', () => {
  let component: PfHistoryComponent;
  let fixture: ComponentFixture<PfHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PfHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PfHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
