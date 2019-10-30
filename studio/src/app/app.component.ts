import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from './services/globals.service';
import { User } from './models/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    public translate: TranslateService,
    public global: GlobalsService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    translate.addLangs(['mn', 'en']);
    translate.setDefaultLang('mn');
    translate.use('mn');
    const token = this.getParameterByName('token');

    if (token) {
      const user: User = {
        ...new User(),
        token: token,
      };
      localStorage.setItem('currentUser', JSON.stringify(user));
    }
  }

  loading() {
    return this.global.loading;
  }
  hideLoading() {
    this.global.loading = false;
  }

  goto(path: string) {
    this.router.navigateByUrl(path);
  }

  getParameterByName(name: string, url?: any) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
      results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
  }
}
