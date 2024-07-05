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
    } else if (this.platform.is('ios')) {
      // For iOS, you may prompt the user to enter their email and phone number manually
      userInfo.email = 'ios@example.com'; // Dummy data for iOS
      userInfo.phoneNumber = '1234567890'; // Dummy data for iOS
    } else {
      // Mock data for browser
      userInfo.email = 'browser@example.com';
      userInfo.phoneNumber = '0987654321';
    }

    return userInfo;
  }
}