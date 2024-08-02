import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CookieService {

  private http = inject(HttpClient);
  constructor() {}

  areCookiesAccepted(): boolean {
    try {
      document.cookie = 'cookietest=1';
      const cookiesEnabled = document.cookie.indexOf('cookietest=') !== -1;
      document.cookie = 'cookietest=1; expires=Thu, 01-Jan-1970 00:00:01 GMT';
      return cookiesEnabled;
    } catch (e) {
      return false;
    }
  }

  setCookieConsent(): void {
    const expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    document.cookie = `cookieBy=angularApp; expires=${expiryDate.toUTCString()}; path=/`;
  }

  declineCookieConsent(): void {
    document.cookie =
      'cookieBy=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  }

  tsetcookie(): Observable<any>{
    return this.http.get<any>(environment.API_URL + 'set-cookie', { withCredentials: true });
  }

  tcheckcookie(): Observable<any>{
    return this.http.get<any>(environment.API_URL + 'check-cookie', { withCredentials: true });
  }
}
