import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeaveCampaignModalComponent } from './leave-campaign-modal.component';

describe('LeaveCampaignModalComponent', () => {
  let component: LeaveCampaignModalComponent;
  let fixture: ComponentFixture<LeaveCampaignModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeaveCampaignModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeaveCampaignModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
