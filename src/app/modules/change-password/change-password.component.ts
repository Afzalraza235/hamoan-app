import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  public changePass: FormGroup; 
  public showForm: boolean = false;
  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<ChangePasswordComponent>,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit(): void {
    this.initForm();
  }
  initForm() {
    this.changePass = this.fb.group({
      password: new FormControl('', Validators.required)
    });
    this.showForm = true;
  }

  save() {
    this.dialogRef.close(this.changePass.value);
  }
}
