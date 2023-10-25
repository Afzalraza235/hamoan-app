import { Component, OnInit } from '@angular/core';
import { AppSettings, AuthenticationService, HelperService } from 'src/app/services/_services';
@Component({
  selector: 'app-eod-table-report-manager',
  templateUrl: './eod-table-report-manager.component.html',
  styleUrls: ['./eod-table-report-manager.component.css']
})
export class EodTableReportManagerComponent implements OnInit {
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
          const filteredRecord = resp.data.filter(pl => pl.plAccount != null && pl.equity != null);
          this.gridData = filteredRecord;
          this.loading = false;
        }
    }, error => {

    });
  }

  getColor(pl) {
    if (pl.plAccount > 0 && pl.pltype !='Withdrawal' && pl.pltype !='Contract Expired') {
      return 'success';
    }
    else if (pl.plAccount < 0.1 || pl.pltype =='Withdrawal' || pl.pltype =='Contract Expired') {
      return 'danger';
    }
    else {
      return 'primary';
    }
  }
}
