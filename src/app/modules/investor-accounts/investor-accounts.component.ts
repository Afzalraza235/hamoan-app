import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HelperService } from 'src/app/services/_services/helperFns.service';
// import { ChangePasswordComponent } from '../change-password/change-password.component';
import { AppSettings } from 'src/app/services/_services';
import { ChangePasswordComponent } from '../change-password/change-password.component';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-investor-accounts',
  templateUrl: './investor-accounts.component.html',
  styleUrls: ['./investor-accounts.component.css']
})
export class InvestorAccountsComponent implements OnInit {
  gridData: any[] = [];
  handleRefresh(event) {
    this.getInvestorAccount();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  public loading: boolean = true;
  constructor(
    private helperService: HelperService,
    private dialog: MatDialog,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.getInvestorAccount();
  }

  getInvestorAccount() {
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getUsers');
    this.helperService.httpPostRequests(url, data).then(resp => {
      this.gridData = resp.data.filter(user => user.account_type != '1');
      this.loading = false;
    });
  }
  changePass(user){
    const dialoRef = this.dialog.open(ChangePasswordComponent, {
      width: '500px',
      disableClose: true,
      hasBackdrop: true,
      data: {user: user}
    });
    dialoRef.afterClosed().subscribe(resp => {
      if (resp) {
        let url = AppSettings.API_ENDPOINT + 'admin.php';
        let data = new FormData();
        data.append('action', 'changePass');
        data.append('id', user.id);
        data.append('password', resp.password);
    
        this.helperService.httpPostRequests(url, data).then(resp => {
          if (resp) {
            this.presentToast('Password has been changed.');
          }
          else {
            this.presentToast('Error');
          }
        });
      }
    });
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
