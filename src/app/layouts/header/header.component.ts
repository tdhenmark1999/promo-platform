import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthState } from 'src/app/components/auth/store/auth.state';
import { Store } from '@ngxs/store'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  userId = this.store.selectSnapshot(AuthState.getEncryptedUserId);
  name = this.store.selectSnapshot(AuthState.getEncryptedName);

  constructor(
    private router: Router,
    private store: Store
  ) {}

  ngOnInit(): void {
  }

  clickLogout(){
  }

  goToDashboard(){
    this.router.navigate([`/campaigns/campaign-dashboard`],{
      queryParams: {
        UserID: this.userId,
        Name: this.name,
      }
    });
  }

}
