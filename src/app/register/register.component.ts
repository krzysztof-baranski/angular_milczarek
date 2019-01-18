import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  register = (form) => {
    const user = form.value;

    console.log('Login');
    if (this.userService.register(user)) {
      this.router.navigate(['/game']);
    } else {
      form.setErrors({
        registerInvalid: true
      });
    }  
  }

}
