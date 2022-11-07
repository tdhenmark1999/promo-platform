import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsFormComponent } from './rewards-form.component';

describe('RewardsFormComponent', () => {
  let component: RewardsFormComponent;
  let fixture: ComponentFixture<RewardsFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RewardsFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
