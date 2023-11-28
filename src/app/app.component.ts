import { Component } from '@angular/core';
import { ThemeService } from './global/template/theme/service/theme.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  title = 'hurr-ui';

  constructor (private router: Router,
               private themeService: ThemeService) {

    this.themeService.switchTheme("saga-blue");
  }

  onClickLevel1() {
    this.router.navigate(['user/login']);
  }
}