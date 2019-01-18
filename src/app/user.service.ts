import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  users;
  loggedUser;

  constructor() {
    this.users = [
      {
        id: 0,
        username: 'Kamilek',
        // email: 'kamil@o2.pl',
        password: '123',
        // role: 'admin'
      }
    ];
    this.loggedUser = this.users[0];
  }


  login(user): boolean {
    return this.users.findIndex((u) => {
      if (u.username === user.username && u.password === user.password) {
        this.loggedUser = u;
        return u;
      } 
      return false;
    }) >= 0;
  }

  logout(): void {
    this.loggedUser = null;
  }

  register(user): boolean {
    for (let u of this.users) {
      if (user.username === u.username /* || user.email === u.email */) {
        return false;
      }
    }

    let newUser = { ...user };
    newUser.id = this.users.length;
    this.users.push(newUser);
    return true;
  }
}
