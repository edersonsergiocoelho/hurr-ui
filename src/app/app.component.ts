import { Component } from '@angular/core';
import { ThemeService } from './global/template/theme/service/theme.service';
import { SessionStorageService } from './core/session-storage/service/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'hurr-ui';

  constructor (private sessionStorageService: SessionStorageService,
               private themeService: ThemeService) {

    const userPreference = sessionStorageService.getUserPreference();

    if (userPreference != null ) {
      this.themeService.switchTheme(userPreference.theme);
    } else {
      this.themeService.switchTheme("lara-light-purple");
    }
  }
}