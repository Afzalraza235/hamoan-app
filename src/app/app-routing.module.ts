import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './modules/landingpage/landingpage.component';
import { EodTableReportManagerComponent } from './modules/eod-table-report-manager/eod-table-report-manager.component';
import { TradingHistoryReportManagerComponent } from './modules/trading-history-report-manager/trading-history-report-manager.component';
import { PfHistoryComponent } from './modules/pf-history/pf-history.component';
import { AuthGuard } from './services/_helpers';
import { RequestsComponent } from './modules/requests/requests.component';
import { ProfileComponent } from './modules/profile/profile.component';
import { WalletComponent } from './modules/wallet/wallet.component';
import { InvestorAccountsComponent } from './modules/investor-accounts/investor-accounts.component';
import { GlobalExposureManagerComponent } from './modules/global-exposure-manager/global-exposure-manager.component';


const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthPageModule)
  },
  {
    path: 'home',
    component: LandingpageComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eod-table-report-manager',
    component: EodTableReportManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'trading-history-report-manager',
    component: TradingHistoryReportManagerComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'pf-history',
    component: PfHistoryComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'requests',
    component: RequestsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'profile',
    component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'wallet',
    component: WalletComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'investor-accounts',
    component: InvestorAccountsComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'global-exposure-manager',
    component: GlobalExposureManagerComponent,
    canActivate: [AuthGuard]
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
