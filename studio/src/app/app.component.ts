import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { GlobalsService } from './services/globals.service';

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
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog,
  ) {
    translate.addLangs(['mn', 'en']);
    translate.setDefaultLang('mn');
    translate.use('mn');
    const user: any = {
      token: this.activatedRoute.snapshot.queryParamMap.get('token'),
    };
    localStorage.setItem('currentUser', JSON.stringify(user));
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
}
