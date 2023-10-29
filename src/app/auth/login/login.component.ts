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
  public loading: boolean = false;
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
    let prevEmail = localStorage.getItem('loginEmail');
    let prevPass = localStorage.getItem('loginPass');
    
    this.loginForm = this._FB.group({
      email: [prevEmail ? prevEmail : '', [Validators.required, Validators.email]],
      password: [prevPass? prevPass : '', Validators.required],
      remember: [prevEmail ? true : false]
    })
  }

  login() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append("action", "login");
    data.append("email", this.loginForm.controls.email.value);
    data.append("password", this.loginForm.controls.password.value);

    this.helperService.httpPostRequests(url, data).then(user => {
      if (!user.error) {
        if (this.loginForm.controls.remember.value) {
          localStorage.setItem('loginEmail', this.loginForm.controls.email.value);
          localStorage.setItem('loginPass', this.loginForm.controls.password.value);
        }
        else {
          localStorage.clear();
        }
        this.loading = false;
        this.authenticationService.setCurrentUserValue(user[0]);
        this.presentToast('Successfully Login');
        this.router.navigate(['/home']);
      } else {
        this.loading = false;
        this.presentToast(user.error);
      }
    }, error => {
      this.loading = false;
      this.presentToast('Something went wrong');
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
