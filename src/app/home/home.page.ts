import { Component, OnInit } from '@angular/core';
import { UserService } from '../user-service.service';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  email: string = '';
  phoneNumber: string = '';

  constructor(private userService: UserService, private barcodeScanner: BarcodeScanner, private router: Router) { }

  ngOnInit() {
    this.userService.getUserInfo().then(userInfo => {
      this.email = userInfo.email;
      this.phoneNumber = userInfo.phoneNumber;
    });
  }

  scanQRCode() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if (!barcodeData.cancelled) {
        this.router.navigate(['/register']);
      } else {
        this.router.navigate(['/register']);
      }
    }).catch(err => {
      console.log('Error', err);
    });
  }
}
