import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import {MatDialogModule} from '@angular/material/dialog';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';
import { EodTableReportManagerComponent } from './modules/eod-table-report-manager/eod-table-report-manager.component';
import { TradingHistoryReportManagerComponent } from './modules/trading-history-report-manager/trading-history-report-manager.component';
import { PfHistoryComponent } from './modules/pf-history/pf-history.component';
import { RequestsComponent } from './modules/requests/requests.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { WalletComponent } from './modules/wallet/wallet.component';
import { WithdrawDialogComponent } from './modules/withdraw-dialog/withdraw-dialog.component';
import { InvestorAccountsComponent } from './modules/investor-accounts/investor-accounts.component';
import { ChangePasswordComponent } from './modules/change-password/change-password.component';
import { GlobalExposureManagerComponent } from './modules/global-exposure-manager/global-exposure-manager.component';
import { NgChartsModule } from 'ng2-charts';
import { LayoutComponent } from './modules/layout/layout.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingpageComponent,
    EodTableReportManagerComponent,
    TradingHistoryReportManagerComponent,
    PfHistoryComponent,
    RequestsComponent,
    ProfileComponent,
    WalletComponent,
    WithdrawDialogComponent,
    InvestorAccountsComponent,
    ChangePasswordComponent,
    GlobalExposureManagerComponent,
    LayoutComponent
  ],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    CommonModule,
    FormsModule, HttpClientModule, ReactiveFormsModule, MatDialogModule, NgChartsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
