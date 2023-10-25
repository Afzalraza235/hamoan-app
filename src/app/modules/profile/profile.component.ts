import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { AppSettings, AuthenticationService } from 'src/app/services/_services';
import { HelperService } from 'src/app/services/_services/helperFns.service';
import * as moment from 'moment';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userForm: FormGroup;
  public showForm: boolean = false;
  public hide: boolean = true;
  public user: any;
  constructor(
    private fb: FormBuilder,
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.get_currentUserValue();
    this.initForm();
  }

  initForm() {
   let futureMonth;
   if (this.user?.term != null) {
    let formatDate = this.user?.investment_date?.split("/");
    var temp = formatDate[0];
    formatDate[0] = formatDate[2];
    formatDate[2] = temp;
    formatDate = formatDate?.join("/");
    console.log("formatDate", formatDate);
    
    // const localDate = moment(this.user?.investment_date).locale('DD/MM/YYYY');
    // console.log("localDate", localDate);
    
    const localDate1 = moment(formatDate);
    futureMonth = moment(localDate1).add(this.user?.term, 'M');
    let futureMonthEnd = moment(futureMonth).endOf('month');
    if(localDate1.date() != futureMonth.date() && futureMonth.isSame(futureMonthEnd.format('DD/MM/YYYY'))) {
      futureMonth = futureMonth.add(1, 'd');
    }
   }
    this.userForm = this.fb.group({
      first_name: new FormControl(this.user?.first_name, Validators.required),
      last_name: new FormControl(this.user?.last_name, Validators.required),
      email: new FormControl({value: this.user?.email, disabled: true}, Validators.required),
      password: new FormControl(this.user?.password, Validators.required),
      phone: new FormControl(this.user?.phone),
      address: new FormControl(this.user?.address),
      investment_amount: new FormControl({value: this.user?.investment_amount, disabled: true}),
      account_no: new FormControl({value: this.user?.account_no, disabled: true}),
      // profit_percentage: new FormControl({value: this.user?.profit_percentage, disabled: true}),
      investment_date: new FormControl({value: this.user?.investment_date, disabled: true}, Validators.required),
      term: new FormControl({value: this.user?.term  + ' Months', disabled: true}, Validators.required),
      endDate: new FormControl({value: futureMonth.format('DD/MM/YYYY'), disabled: true}),
    });
    this.showForm = true;
  }
  save() {
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'updateUser');
    data.append('id', this.user.id);
    data.append('first_name', this.userForm.controls['first_name'].value);
    data.append('last_name', this.userForm.controls['last_name'].value);
    data.append('email', this.userForm.controls['email'].value);
    data.append('password', this.userForm.controls['password'].value);
    data.append('phone', this.userForm.controls['phone'].value);
    data.append('account_no', this.user?.account_no);
    data.append('investment_amount', this.user?.investment_amount);
    data.append('investment_date', this.user?.investment_date);
    data.append('profit_percentage', this.user?.profit_percentage);
    data.append('account_type', this.user?.account_type);
    data.append('currency', this.user?.currency);
    data.append('pf_ratio', this.user?.pf_ratio);
    data.append('term', this.user?.term);
    data.append('address', this.userForm.controls['address'].value);

    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp) {
        this.getUserAgain();
        // this.toastr.success('Your Profile has been Updated.');
        this.presentToast('Your Profile has been Updated.');
      }
      else {
        this.presentToast('Error');
        // this.toastr.error('Error');
      }
    });
  }
  getUserAgain() {
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append("action", "getUserById");
    data.append("id", this.user.id);

    this.helperService.httpPostRequests(url, data).then(user => {
      if (!user.error) {
        this.authenticationService.setCurrentUserValue(user[0]);
        this.ngOnInit();
      } else {
        this.presentToast(user.error);
        // this.toastr.error(user.error);
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
