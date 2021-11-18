import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BirthdayLifetimeSpan } from './birthday-lifetime-span';
import { ConfigurationComponent } from './configuration/configuration.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentBirthday: BirthdayLifetimeSpan | null = null;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.openSettings();
  }

  public openSettings() {
    let birthday = BirthdayLifetimeSpan.default();

    if (this.currentBirthday) {
      birthday = new BirthdayLifetimeSpan(
        this.currentBirthday.birthday,
        this.currentBirthday.lifetime
      );
    }

    let configurationDialog = this.dialog.open(ConfigurationComponent, {
      data: birthday,
    });
    configurationDialog
      .afterClosed()
      .subscribe((data: BirthdayLifetimeSpan) => {
        if (data) {
          this.currentBirthday = data;
        }
      });
  }
}
