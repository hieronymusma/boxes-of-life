import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BirthdayLifetimeSpan } from './birthday-lifetime-span';
import { ConfigurationComponent } from './configuration/configuration.component';
import { DateSaveService } from './date-save.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  currentBirthday: BirthdayLifetimeSpan | null = null;

  constructor(private dialog: MatDialog, private dateSave: DateSaveService) {}

  ngOnInit() {
    let currentBirthday = this.dateSave.get();
    if (currentBirthday == null) {
      this.openSettings();
    } else {
      this.currentBirthday = currentBirthday;
    }
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
      maxWidth: '500px',
      disableClose: this.currentBirthday == null,
    });
    configurationDialog
      .afterClosed()
      .subscribe((data: BirthdayLifetimeSpan) => {
        if (data) {
          this.currentBirthday = data;
          this.dateSave.save(data);
        }
      });
  }
}
