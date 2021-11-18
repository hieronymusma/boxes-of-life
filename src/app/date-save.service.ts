import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';
import { BirthdayLifetimeSpan } from './birthday-lifetime-span';

const BIRTHDAY_LIFETIME_COOKIE_KEY = "birthday-lifetime";

@Injectable({
  providedIn: 'root'
})
export class DateSaveService {

  constructor(private cookie: CookieService) { }

  public save(birthdayLifetimeSpan: BirthdayLifetimeSpan) {
    this.cookie.putObject(BIRTHDAY_LIFETIME_COOKIE_KEY, birthdayLifetimeSpan);
  }

  public get(): BirthdayLifetimeSpan | null {
    if (this.cookie.hasKey(BIRTHDAY_LIFETIME_COOKIE_KEY)) {
      let dataObject = this.cookie.getObject(BIRTHDAY_LIFETIME_COOKIE_KEY) as BirthdayLifetimeSpan;
      return new BirthdayLifetimeSpan(new Date(dataObject.birthday), dataObject.lifetime);
    }
    return null;
  }
}
