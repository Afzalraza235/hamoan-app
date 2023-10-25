import { Component, OnInit, OnDestroy } from '@angular/core';
import { Chart, ChartConfiguration } from 'chart.js';
import { AppSettings, AuthenticationService, HelperService } from 'src/app/services/_services';

@Component({
  selector: 'app-global-exposure-manager',
  templateUrl: './global-exposure-manager.component.html',
  styleUrls: ['./global-exposure-manager.component.css']
})
export class GlobalExposureManagerComponent implements OnInit, OnDestroy {
  title = 'ng2-charts-demo';
  public chart: Chart;
  public loading: boolean = false;
  public user: any = {};

  handleRefresh(event) {
    this.ngOnInit();
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
    this.getExposure();
  }

  getExposure() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getexposure');
    data.append('id', this.user.id);
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp.data.length > 0) {
        // console.log("resp", resp);
      const barValues = Object.keys(resp.data[0])
      .filter(key => key.startsWith("bar") && resp.data[0][key] !== "0")
      .map(key => resp.data[0][key]);

    // Extract type values
    const typeValues = Object.keys(resp.data[0])
      .filter(key => key.startsWith("type") && resp.data[0][key] !== "")
      .map(key => resp.data[0][key]);

//       console.log("Bar Values:", barValues);
// console.log("Type Values:", typeValues);
      // this.gridData = resp?.data?.filter(pl => pl.pltype !== 'New Investor' && pl.pltype !== 'Contract Expired' && pl.manager_profit != null);
      this.loading = false;
      this.initChart(barValues, typeValues);
      }
      else {
        this.initChart([], []);
      }
    });
  }

  initChart(bars, types) {
    this.chart = new Chart("canvas", {
      type: "bar",
      
      data: {
        labels: types.length > 0 ? types : [],
        datasets: [
          {
            data: bars.length > 0 ? bars : [],
            backgroundColor: [
              types[0]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[1]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[2]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[3]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[4]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[5]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[6]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
            ],
            borderColor: [
              types[0]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[1]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[2]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[3]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[4]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[5]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[6]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
            ],
            hoverBackgroundColor: [
              types[0]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[1]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[2]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[3]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[4]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[5]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[6]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
            ],
            hoverBorderColor: [
              types[0]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[1]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[2]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[3]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[4]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[5]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
              types[6]?.toLowerCase() === 'sell' ? "rgba(255, 99, 132, 1)" : "rgba(54, 162, 235, 1)",
            ],
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
              display: false,
              labels: {
                  color: 'rgb(255, 99, 132)'
              }
          }
        }
      }
    });
  }
  ngOnDestroy() {
    this.chart.unbindEvents();
    this.chart.destroy();
  }
}
