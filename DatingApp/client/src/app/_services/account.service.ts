import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

// Services are injectable and singleton
// data we store in our service isn't destroyed until the service is shut down.
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = 'https://localhost:5001/api/';

  constructor(private http: HttpClient) { }

  login(model: any) {
    return this.http.post(this.baseUrl + 'account/login', model);
  }
}
