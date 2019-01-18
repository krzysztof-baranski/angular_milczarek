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

  form = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(2), UsernameValidators.cannotContainSpace/* , UsernameValidators.shouldBeUnique */]),
    password: new FormControl('', [Validators.required])
  });

  submitFn() {
    this.submit(this.form);
  }

  get username () {
    return this.form.get('username');
  }
}
