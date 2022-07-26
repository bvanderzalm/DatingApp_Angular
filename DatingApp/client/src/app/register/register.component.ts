import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Output() cancelRegister = new EventEmitter();
  model: any = {};
  registerForm: FormGroup;
  maxDate: Date;

  constructor(private accountService: AccountService, private toastr: ToastrService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.initializeForm();
    this.maxDate = new Date();
    // This says that the calendar won't show anything less than 18 years ago.
    // AKA you have to be 18 or older to start an account
    this.maxDate.setFullYear(this.maxDate.getFullYear() -18);
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      // So the first is the initial string, and validators are stuff that needs to be down where it will alert you if you don't follow them
      // If one of the validators aren't met the FormGroup.status will be set to "invalid"
      username: ['', Validators.required],
      gender: ['male'],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(8)]],
      confirmPassword: ['', [Validators.required, this.matchValues('password')]]
    })

    // We can validate if we change our password
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    })
  }

  // This will compare password and confirmPassword
  // Password is string passed in. Confirm password is that first control?.value
  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value === control?.parent?.controls[matchTo].value 
        ? null : {isMatching: true}
    }
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.regiser(this.model).subscribe(response => {
    //   console.log(response);
    //   this.cancel();
    // }, error => {
    //   console.log(error);
    //   this.toastr.error(error.error);
    // })
  }

  cancel() {
    this.cancelRegister.emit(false);
  }

}
