import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { UsernameValidators } from '../username.validators';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent/*  implements OnInit */ {
  
  @Input() submit;
  @Input() buttonMsg;

  constructor(private router: Router) {}

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), UsernameValidators.cannotContainSpace/* , UsernameValidators.shouldBeUnique */]),
    password: new FormControl('', [Validators.required]),
    confirmPassword: new FormControl('')
  });

  ngOnInit() {
    if (this.router.url === '/register') {
      console.log('add val')
      this.confirmPassword.setValidators([Validators.required, UsernameValidators.shouldBeEqual]);
    } 
  }

  submitFn() {
    this.submit(this.form);
  }

  resetForm() {
    this.form.reset();
  }

  get username () {
    return this.form.get('username');
  }

  get password () {
    return this.form.get('password');
  }

  get confirmPassword () {
    return this.form.get('confirmPassword');
  }
}
