import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CookieService } from './core/services/cookie.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'Support Board';
  loading: boolean = true;
  showCookieBox: boolean = true;

  private cookieService = inject(CookieService);
  private http = inject(HttpClient);

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showCookieBox = !this.cookieService.areCookiesAccepted();
    this.checkThirdPartyCookie();
  }

  acceptCookies(): void {
    this.cookieService.setCookieConsent();
    this.showCookieBox = false;
  }

  declineCookies(): void {
    this.cookieService.declineCookieConsent();
    this.showCookieBox = false;
  }

  checkThirdPartyCookie() {
    const thirdPartyDomain = 'https://ticketing-tool-omega.vercel.app/api/';

    this.http.get(`${thirdPartyDomain}set-cookie`, { withCredentials: true }).subscribe(
      {
        next: () => {
          this.http.get(`${thirdPartyDomain}check-cookie`, { withCredentials: true }).subscribe(
            {
              next: (response: any) => {
                if (response.msg === 'enabled') {
                  console.log('Third-party cookies are enabled');
                } else {
                  this.loading = false;
                  console.warn('Third-party cookies are disabled');
                }
              },
              error: (error) => {
                console.error('Error checking third-party cookies', error);
              },
            }
          );
        },
        error: (error) => {
          console.error('Error setting third-party cookie', error);
        },
      }
    );

  }
}
