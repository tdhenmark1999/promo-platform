import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TblDashboardComponent } from './tbl-dashboard.component';

describe('TblDashboardComponent', () => {
  let component: TblDashboardComponent;
  let fixture: ComponentFixture<TblDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TblDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TblDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
