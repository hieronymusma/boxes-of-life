import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { BirthdayLifetimeSpan } from '../birthday-lifetime-span';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.component.html',
  styleUrls: ['./configuration.component.scss'],
})
export class ConfigurationComponent {
  public lifetimeSpan: BirthdayLifetimeSpan = BirthdayLifetimeSpan.default();

  public dateForm = this.formBuilder.group({
    dateOfBirth: ['', Validators.required],
  });

  constructor(
    private dialogRef: MatDialogRef<ConfigurationComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) data: BirthdayLifetimeSpan
  ) {
    if (data) {
      this.lifetimeSpan = data;
    }
  }

  public dateChanged(newDate: MatDatepickerInputEvent<Date>) {
    if (newDate.value) {
      this.lifetimeSpan.updateDate(newDate.value);
    }
  }

  public save() {
    this.dialogRef.close(this.lifetimeSpan);
  }

  public now(): Date {
    return new Date();
  }
}
