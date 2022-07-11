import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../_models/user';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {}

  constructor(public accountService: AccountService, private router: Router) { }

  ngOnInit(): void {
  }

  login() {
    this.accountService.login(this.model).subscribe(response => {
      // This will navigate the user to the members page after they have logged in.
      this.router.navigateByUrl('/members');
    }, error => {
      console.log(error);
    })
  }

  logout() {
    this.accountService.logout();
    // This will take the user back to the home page after they logout.
    this.router.navigateByUrl('/');
  }
}
