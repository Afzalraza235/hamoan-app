import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';
import { AppSettings, AuthenticationService } from 'src/app/services/_services';
import { HelperService } from 'src/app/services/_services/helperFns.service';

@Component({
  selector: 'app-requests',
  templateUrl: './requests.component.html',
  styleUrls: ['./requests.component.css']
})
export class RequestsComponent implements OnInit {
  public gridData: any[];
  public loading: boolean = false;
  public user: any = {};
  handleRefresh(event) {
    this.getRequests();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  constructor(
    private authenticationService: AuthenticationService,
    private helperService: HelperService,
    private toastController: ToastController
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.get_currentUserValue();
    this.getRequests();
  }

  getRequests() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getallrequests');
    // data.append('id', this.user.id);
    this.helperService.httpPostRequests(url, data).then(resp => {
      this.gridData = resp.data;
      this.loading = false;
    });
  }

  appReq(item) {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    
    data.append('id', item.id);
    data.append('user_id', item.user_id);
    data.append('withdraw_amount', item.withdraw_amount);
    data.append('withdraw_date', item.withdraw_date);
    if (item.transaction_type === 'ReInvest') {
      data.append('action', 'approveinvest');
      this.helperService.httpPostRequests(url, data).then(resp => {
        if (resp) {
          
          // this.toastr.success('Request Approved');
          this.presentToast('Request Approved');
          this.loading = false;
          this.getRequests();
          this.updateUserResp();
        }
      });
    }
    else {
      data.append('action', 'approvereq');
      this.helperService.httpPostRequests(url, data).then(resp => {
        if (resp) {
          this.presentToast('Request Approved');
          // this.toastr.success('Request Approved');
          this.loading = false;
          this.getRequests();
          this.updateUserResp();
        }
      });
    }
  }

  rejectReq(item) {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'rejectreq');
    data.append('id', item.id);
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp) {
        this.presentToast('Request Rejected');
        // this.toastr.success('Request Rejected');
        this.loading = false;
        this.getRequests();
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
