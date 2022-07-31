import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MemberEditComponent } from '../members/member-edit/member-edit.component';
import { ConfirmService } from '../_services/confirm.service';

@Injectable({
  providedIn: 'root'
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {

  constructor(private confirmService: ConfirmService) { }

  // Can either return a boolean or an observable boolean.
  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
    // If there has been changes to the angular form than alert user whenever they try to leave the page without saving.
    // This doesn't protect if the user tries to go to google.com ie. Only if they changes pages on our site.
    if (component.editForm.dirty) {
      return this.confirmService.confirm();
    }
    return true;
  }
  
}
