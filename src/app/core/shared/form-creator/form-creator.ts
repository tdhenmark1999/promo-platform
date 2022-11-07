import { FormBuilder, Validators } from '@angular/forms';


export function createCampaignInfoForm(fb:FormBuilder,selectedFormData:any) {
    return fb.group({
        campaign_name:[selectedFormData,Validators.required],
        start_date:['',Validators.required],
        end_date:['',Validators.required]
    });
}