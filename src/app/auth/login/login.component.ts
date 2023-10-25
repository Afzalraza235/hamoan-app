import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AppSettings, AuthenticationService, HelperService } from 'src/app/services/_services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  public UserLoginKey: any;

  constructor(
    private _FB: FormBuilder,
    private helperService: HelperService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private toastController: ToastController
  ) {
    if (this.authenticationService.get_currentUserValue()) { // Redirect to dashboard if already logged in
      this.router.navigate(['/home']);
    } else {
      // Get User login key
      // this.UserLoginKey = this.authenticationService.get_UserLoginKey();
    }
  }

  ngOnInit() {
    this.loginForm = this._FB.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    })
  }

  login() {
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append("action", "login");
    data.append("email", this.loginForm.controls.email.value);
    data.append("password", this.loginForm.controls.password.value);

    this.helperService.httpPostRequests(url, data).then(user => {
      if (!user.error) {
        this.authenticationService.setCurrentUserValue(user[0]);
        this.presentToast('Successfully Login');
        this.router.navigate(['/home']);
      } else {
        this.presentToast(user.error);
      }
    })
  }

  async presentToast(message) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'bottom'
    });

    await toast.present();
  }
}
