import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { BirthdayLifetimeSpan } from '../birthday-lifetime-span';

@Component({
  selector: 'app-boxes',
  templateUrl: './boxes.component.html',
  styleUrls: ['./boxes.component.scss']
})
export class BoxesComponent implements AfterViewChecked {

  @Input() lifetimeSpan: BirthdayLifetimeSpan | null = null;
  @ViewChild('container') container!: ElementRef;

  constructor(private changeDetector: ChangeDetectorRef) { }

  public boxSize: number = 15;

  public get isVisible(): boolean {
    return this.lifetimeSpan != null;
  }

  public get numberOfUsedWeeks(): Array<void> {
    if (this.lifetimeSpan) {
      return Array(this.weeksBetween(this.lifetimeSpan.birthday, this.now()));
    }
    return [];
  } 

  public get numberOfUnusedWeeks(): Array<void> {
    return Array(this.weeksBetween(this.now(), this._endDate));
  }

  private get _totalNumberOfBoxes(): number {
    return this.numberOfUsedWeeks.length + this.numberOfUnusedWeeks.length;
  }

  private get _endDate(): Date {
    if (this.lifetimeSpan) {
      let endDate = new Date(this.lifetimeSpan.birthday);
      endDate.setFullYear(endDate.getFullYear() + this.lifetimeSpan.lifetime);
      return endDate;
    }
    return this.now();
  }
  
  ngAfterViewChecked(): void {
    this.resizeBoxes();
  }

  @HostListener('window:resize')
  private resizeBoxes() {
    if (!this.container) return;
    
    let width: number = this.container.nativeElement.clientWidth;
    let height: number = window.innerHeight - this.container.nativeElement.offsetTop - 100;

    let boxesSize = Math.sqrt(width * height / (this._totalNumberOfBoxes));
    if (this.boxSize != boxesSize) {
      this.boxSize = boxesSize;
      this.changeDetector.detectChanges();
    }
  }

  private weeksBetween(d1: Date, d2: Date): number {
    return Math.round((d2.getTime() - d1.getTime()) / (7 * 24 * 60 * 60 * 1000));
  }

  private now(): Date {
    return new Date();
  }
}
