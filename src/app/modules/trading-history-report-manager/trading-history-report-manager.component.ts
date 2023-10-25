import { Component, OnInit } from '@angular/core';
import { AppSettings, AuthenticationService, HelperService } from 'src/app/services/_services';

@Component({
  selector: 'app-trading-history-report-manager',
  templateUrl: './trading-history-report-manager.component.html',
  styleUrls: ['./trading-history-report-manager.component.css']
})
export class TradingHistoryReportManagerComponent implements OnInit {
  public gridData: any[] = [];
  public loading: boolean = false;
  public user: any;
  handleRefresh(event) {
    this.gettransactions();
    setTimeout(() => {
      event.target.complete();
    }, 500);
  }
  constructor(
    private authenticationService: AuthenticationService,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.user = this.authenticationService.get_currentUserValue();
    this.gettransactions();
  }

  gettransactions() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getTradingHistory');
    data.append('id', this.user.id);
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp) {
        this.gridData = resp.data;
        this.loading = false;
      }
    }, error => {

    });
  }

  formatValue(value: number): string {
    // Convert the number to a string
    const stringValue = value.toString();

    // Use regular expression to remove trailing zeros
    const formattedValue = stringValue.replace(/\.?0+$/, '');

    return formattedValue;
  }

}
