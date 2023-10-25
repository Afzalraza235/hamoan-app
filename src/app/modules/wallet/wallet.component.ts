import { Component, OnInit } from '@angular/core';
import { AppSettings, AuthenticationService } from 'src/app/services/_services';
import { HelperService } from 'src/app/services/_services/helperFns.service';
import { WithdrawDialogComponent } from '../withdraw-dialog/withdraw-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit {
  public user: any;
  public monthlyProfit: any;
  public lastMonthlyProfit: any;
  public requests: any = [];
  public nextMonth: any;
  public loading: boolean = false;
  public checkMonth: any;
  handleRefresh(event) {
    this.ngOnInit();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  constructor(
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
    private dialog: MatDialog,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.get_currentUserValue();
    this.updateUserResp();
    this.getdailyPl();
    this.addOneMonth(new Date(this.user?.withdraw_date));
    this.getReqById();
  }
  addOneMonth(date: Date) {
    const newDate = new Date(date);
    newDate.setMonth(date.getMonth());
    // Handle year transition if needed
    if (newDate.getMonth() === 0) {
      newDate.setFullYear(date.getFullYear() + 1);
    }
    this.getLastDateOfMonth(newDate);
  }

  getLastDateOfMonth(inputDate: Date) {
    // Create a copy of the inputDate to avoid modifying it directly
    const lastDate = new Date(inputDate);
  
    // Set the day component to 1 (first day of the month)
    lastDate.setDate(1);
  
    // Add one month
    lastDate.setMonth(lastDate.getMonth() + 1);
    // console.log("lastDate", lastDate);
    
    // Subtract one day to get the last day of the month
    lastDate.setDate(lastDate.getDate() - 1);
  
    this.nextMonth = lastDate;
    // console.log("this.nextMonth", this.nextMonth);
    
  }
  
  openReinvestModal() {
    const dialoRef = this.dialog.open(WithdrawDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      data: {user: this.user, type: 'reinvest', monthlyProfit: this.monthlyProfit, checkMonth: this.checkMonth}
    });
    dialoRef.afterClosed().subscribe(resp => {
      if (resp) {
        let url = AppSettings.API_ENDPOINT + 'admin.php';
        let data = new FormData();
        data.append('action', 'addrequest');
        data.append('first_name', this.user.first_name);
        data.append('email', this.user.email);
        data.append('withdraw_amount', resp.withdraw_amount);
        data.append('account_no', this.user.account_no);
        data.append('withdraw_status', 'Open');
        data.append('transaction_type', 'ReInvest');
        data.append('user_id', this.user.id);
    
        this.helperService.httpPostRequests(url, data).then(resp => {
          if (resp) {
            this.presentToast('Your Request for Re-Invest has been sent.');
          }
          else {
            this.presentToast('Error');
          }
        });
      }
    });
  }

  openWithDrawModal() {
    const dialoRef = this.dialog.open(WithdrawDialogComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      autoFocus: false,
      data: {user: this.user, type: 'withdraw', monthlyProfit: this.monthlyProfit, checkMonth: this.checkMonth}
    });
    dialoRef.afterClosed().subscribe(resp => {
      if (resp) {
        let url = AppSettings.API_ENDPOINT + 'admin.php';
        let data = new FormData();
        data.append('action', 'addrequest');
        data.append('first_name', this.user.first_name);
        data.append('email', this.user.email);
        data.append('withdraw_amount', resp.withdraw_amount);
        data.append('account_no', this.user.account_no);
        data.append('withdraw_status', 'Open');
        data.append('transaction_type', 'Withdrawal');
        data.append('user_id', this.user.id);
    
        this.helperService.httpPostRequests(url, data).then(resp => {
          if (resp) {
            this.presentToast('Your Request for withdrawal has been sent.');
          }
          else {
            this.presentToast('Error');
          }
        });
      }
    });
  }
  validate(): boolean {
    if (this.user.account_type === '1') {
      return this.user.profit !== null ? true : false;
    }
    else {
      const currentDate = new Date();
      return new Date(this.nextMonth) < currentDate;
    }
  }
  getReqById() {
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getReqById');
    data.append('user_id', this.user.id);
    
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp?.length > 0) {
        this.requests = resp.reverse();
      }
    });
  }

  getdailyPl() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getDailyPl');
    data.append('id', this.user.id);
    
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp?.data) {
        let withDrawMonth = new Date(this.user.withdraw_date).getMonth() + 1;
        let nowMonth = new Date().getMonth() + 1;
        let differenceMonth = nowMonth - withDrawMonth;
        console.log("differenceMonth", differenceMonth);
        this.checkMonth = differenceMonth;
        let desiredMonth = withDrawMonth + differenceMonth;
        // console.log("desiredMonth", desiredMonth);
        
        // desiredMonth = new Date(new Date().setMonth(desiredMonth)).getMonth();
        // console.log("desired", desiredMonth);
        
        // if (desiredMonth === 13) {
        //   desiredMonth = 1;
        // }
        let sum = 0;
        const filterArray = resp?.data?.filter(profits => profits.pltype == null);
        filterArray?.forEach(item => {
          const createdAtMonth = new Date(item.created_at).getMonth() + 1;
          if (createdAtMonth === desiredMonth) {
            sum += parseFloat(item.plAccount);
          }
        });
        this.monthlyProfit = sum;
        this.lastMonthlyProfit = this.user.profit - this.monthlyProfit;
        // this.maxAmount = this.user.account_type === '1' ? this.user.profit : (parseInt(this.user.profit) + parseInt(this.user?.re_invest_amount) - this.monthlyProfit);
        this.loading = false;
      }
    });
  }

  updateUserResp() {
    if (this.user) {
      this.loading= true;
      let url = AppSettings.API_ENDPOINT + 'admin.php';
      let data = new FormData();
      data.append("action", "getUserById");
      data.append("id", this.user.id);

      this.helperService.httpPostRequests(url, data).then(user => {
        if (!user.error) {
          this.authenticationService.setCurrentUserValue(user[0]);
          this.loading= false;
        }
      });
    }
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
