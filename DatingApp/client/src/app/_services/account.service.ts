import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import {map} from 'rxjs/operators';
import { User } from '../_models/user';

// Services are injectable and singleton
// data we store in our service isn't destroyed until the service is shut down.
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';
  // Only need 1 user at a time.
  private currentUserSource = new ReplaySubject<User>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model).pipe(
      // This will run because we are subscribing in the components.
      map((response: User) => {
        // Response regarding if their is a user where we can successfully login.
        const user = response;
        
        // We either have a user or we don't.
        if (user) {
          // Populate user into localstorage in the browser.
          localStorage.setItem('user', JSON.stringify(user));

          // Set current user to this user
          this.currentUserSource.next(user);
        }
      })
    )
  }


  setCurrentUser(user: User) {
    this.currentUserSource.next(user);
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
  }
}
