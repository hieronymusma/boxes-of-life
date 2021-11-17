import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent {

  @Input() birthday: Date = this.now();
  @Input() lifetime: number = 90;

  public get isVisible(): boolean {
    return this.birthday != null;
  }

  public get numberOfUsedWeeks(): Array<void> {
    return Array(this.weeksBetween(this.birthday, this.now()));
  } 

  public get numberOfUnusedWeeks(): Array<void> {
    return Array(this.weeksBetween(this.now(), this._endDate));
  }

  get _endDate(): Date {
    let endDate = new Date(this.birthday);
    endDate.setFullYear(endDate.getFullYear() + this.lifetime);
    return endDate;
  }

  private weeksBetween(d1: Date, d2: Date): number {
    return Math.round((d2.getTime() - d1.getTime()) / (7 * 24 * 60 * 60 * 1000));
  }

  private now(): Date {
    return new Date();
  }
}
