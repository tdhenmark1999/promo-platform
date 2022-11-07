import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Login } from './../store/auth.action';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm! :FormGroup;
  submitButtonStatus = true;
  formSubmitAttempt = false;
  private destroy$ = new Subject();


  constructor(private fb:FormBuilder,private store:Store) {
      this.loginForm = this.fb.group({
          email:[null,Validators.required],
          password:[null,Validators.required]
      })
   }

  ngOnInit(): void {
  }

  setSubmitButton(flag: boolean) {
    this.submitButtonStatus = flag;
  }

  getSubmitButton() {
    return this.submitButtonStatus;
  }

  ngOnDestroy() {
    this.destroy$.next(null)
  }

  onLogin(form:FormGroup){
      this.formSubmitAttempt = true;
      if (form.valid) {
        this.setSubmitButton(false);
        this.formSubmitAttempt = false;
        this.store.dispatch(new Login(form.value))
      }
  }


}
