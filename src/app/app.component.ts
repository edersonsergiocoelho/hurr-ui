import { Component } from '@angular/core';
import { ThemeService } from './global/template/theme/service/theme.service';
import { SessionStorageService } from './core/session-storage/service/session-storage.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'hurr-ui';

  constructor (private sessionStorageService: SessionStorageService,
               private translateService: TranslateService,
               private themeService: ThemeService) {

    const currentUserPreference = sessionStorageService.getUserPreference();

    if (currentUserPreference != null ) {
      this.translateService.setDefaultLang(currentUserPreference.language);
      this.themeService.switchTheme(currentUserPreference.theme);
    } else {
      this.translateService.setDefaultLang('pt_BR');
      this.themeService.switchTheme("lara-light-purple");
    }
  }
}