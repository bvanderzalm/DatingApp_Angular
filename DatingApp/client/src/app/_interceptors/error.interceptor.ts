import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { NavigationExtras, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  // Router --> For certain types of errors we want to redirect the user to a different error page
  // ToastrService --> For certain types of errors we want to just have a popup notification
  constructor(private router: Router, private toastr: ToastrService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      catchError(error => {
        // Make sure there actually is an error
        if (error) {
          switch (error.status) {
            case 400:
              // This is for the case of 400 validation error where we get an array of errors.
              if (error.error.errors) {
                const modalStateErrors = [];
                for (const key in error.error.errors) {
                  if (error.error.errors[key]) {
                    modalStateErrors.push(error.error.errors[key]);
                  }
                }
                throw modalStateErrors;
              } 
              // Deal with the other regular 400 error with a popup notification.
              else {
                this.toastr.error(error.statusText, error.status);
              }
              break;
            
            case 401:
              this.toastr.error(error.statusText, error.status);
              break;

            case 404:
              this.router.navigateByUrl('/not-found');
              break;

            case 500:
              const navigationExtras: NavigationExtras = {state: {error: error.error}};
              this.router.navigateByUrl('/server-error', navigationExtras);
              break;

            default:
              this.toastr.error('Something unexpected went wrong');
              console.log(error);
              break;
          }
        }

        // Majority of cases will be caught inside the switch statement. If not we'll just return the error to whatever was calling the HTTP request in the first place.
        // Shouldn't ever hit this though.
        return throwError(error);
      })
    )
  }
}
