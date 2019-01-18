import { Component, OnInit, Input } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService,
    private router: Router) { }

  ngOnInit() {
  }

  login = (form) => {
    const user = form.value;

    console.log('Login');
    if (this.userService.login(user)) {
      this.router.navigate(['/game']);
    } else {
      form.setErrors({
        loginInvalid: true
      });
    }  
  }
}
