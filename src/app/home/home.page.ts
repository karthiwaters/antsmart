import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = '';
  phoneNumber: string = '';

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userService.getUserInfo().then(userInfo => {
      this.email = userInfo.email;
      this.phoneNumber = userInfo.phoneNumber;
    });
  }

}
