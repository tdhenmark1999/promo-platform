import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignInfoFormComponent } from './campaign-info-form.component';

describe('CampaignInfoFormComponent', () => {
  let component: CampaignInfoFormComponent;
  let fixture: ComponentFixture<CampaignInfoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignInfoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignInfoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
