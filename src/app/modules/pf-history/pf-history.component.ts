import { Component, OnInit } from '@angular/core';
import { AppSettings, AuthenticationService, HelperService } from 'src/app/services/_services';

@Component({
  selector: 'app-pf-history',
  templateUrl: './pf-history.component.html',
  styleUrls: ['./pf-history.component.css']
})
export class PfHistoryComponent implements OnInit {

  public gridData: any[];
  public loading: boolean = false;
  public user: any = {};
  handleRefresh(event) {
    this.getdailyPl();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }

  constructor(
    private helperService: HelperService,
    private authenticationService: AuthenticationService
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.get_currentUserValue();
    this.getdailyPl();
  }

  getdailyPl() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getDailyPl');
    data.append('id', this.user.id);
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp) {
        this.gridData = resp?.data?.filter(pl => pl.pltype !== 'New Investor' && pl.pltype !== 'Contract Expired' && pl.manager_profit != null);;
        this.loading = false;
      }
    }, error => {

    });
  }
  getColor(pl) {
    if (pl.manager_profit > 0 && pl.pltype !='Withdrawal') {
      return 'success';
    }
    else if (pl.manager_profit < 0.1 || pl.pltype =='Withdrawal') {
      return 'danger';
    }
    else {
      return 'primary';
    }
  }
}
