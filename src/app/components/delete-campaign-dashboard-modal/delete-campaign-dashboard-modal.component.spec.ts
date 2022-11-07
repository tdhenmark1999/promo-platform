import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteCampaignDashboardModalComponent } from './delete-campaign-dashboard-modal.component';

describe('DeleteCampaignDashboardModalComponent', () => {
  let component: DeleteCampaignDashboardModalComponent;
  let fixture: ComponentFixture<DeleteCampaignDashboardModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeleteCampaignDashboardModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeleteCampaignDashboardModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
