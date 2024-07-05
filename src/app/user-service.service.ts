import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Sim } from '@ionic-native/sim/ngx';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private platform: Platform,
    private androidPermissions: AndroidPermissions,
    private sim: Sim
  ) {}

  async getUserInfo() {
    const userInfo = { email: '', phoneNumber: '' };

    if (this.platform.is('android')) {
      await this.androidPermissions.requestPermissions([
        this.androidPermissions.PERMISSION.READ_PHONE_STATE,
        this.androidPermissions.PERMISSION.GET_ACCOUNTS
      ]);

      // Fetch phone number
      await this.sim.getSimInfo().then(
        (info) => userInfo.phoneNumber = info.phoneNumber,
        (err) => console.log('Unable to fetch phone number: ', err)
      );

      // Fetch email (dummy data, needs actual implementation)
      userInfo.email = 'example@gmail.com';
    }

    // For iOS, you may prompt the user to enter their email and phone number manually
    if (this.platform.is('ios')) {
      // Prompt user for email and phone number
    }

    return userInfo;
  }
}