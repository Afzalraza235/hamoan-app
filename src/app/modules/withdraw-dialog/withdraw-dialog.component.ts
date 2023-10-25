import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AppSettings } from 'src/app/services/_services';
import { HelperService } from 'src/app/services/_services/helperFns.service';

@Component({
  selector: 'app-withdraw-dialog',
  templateUrl: './withdraw-dialog.component.html',
  styleUrls: ['./withdraw-dialog.component.css']
})
export class WithdrawDialogComponent implements OnInit {
  public withdraw: FormGroup; 
  public showForm: boolean = false;
  public user: any;
  public maxAmount: any;
  public monthlyProfit: any = 0;
  public loading: boolean = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<WithdrawDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
    private helperService: HelperService
  ) { }

  ngOnInit(): void {
    this.user = this.data.user;
    let reInvestAvailable = this.data?.checkMonth > 0 && this.data.type == 'withdraw' ? parseFloat(this.user?.re_invest_amount) : 0;
    this.maxAmount = this.user.account_type === '1' ? this.user.profit : (parseFloat(this.user.profit) + reInvestAvailable - this.data?.monthlyProfit);
    this.initForm();
    // this.getdailyPl();
  }

  getdailyPl() {
    this.loading = true;
    let url = AppSettings.API_ENDPOINT + 'admin.php';
    let data = new FormData();
    data.append('action', 'getDailyPl');
    data.append('id', this.user.id);
    
    this.helperService.httpPostRequests(url, data).then(resp => {
      if (resp?.data?.length > 0) {
        let withDrawMonth = new Date(this.user.withdraw_date).getMonth() + 1;
        let nowMonth = new Date().getMonth() + 1;
        let differenceMonth = nowMonth - withDrawMonth;
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
        console.log("sum", sum);
        
        this.monthlyProfit = sum;
        this.loading = false;
        this.initForm();
        this.maxAmount = this.user.account_type === '1' ? this.user.profit : (parseInt(this.user.profit) + parseInt(this.user?.re_invest_amount) - this.monthlyProfit);
      }
    });
  }

  initForm() {
    this.withdraw = this.fb.group({
      withdraw_amount: new FormControl('', [Validators.required, Validators.min(1), Validators.max(this.maxAmount != null ? this.maxAmount : 0)])
    });
    this.showForm = true;
  }

  save() {
    this.dialogRef.close(this.withdraw.value);
  }
}
