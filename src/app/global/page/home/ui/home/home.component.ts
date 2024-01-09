import { Component, HostListener, OnInit } from '@angular/core';
import { HomeUIService } from '../../service/home-ui/home-ui.service';
import { Router } from '@angular/router';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: any;
  showMenuUser: boolean = false;
  showSubMenu: boolean = false;

  constructor(private router: Router,
              private homeUIService: HomeUIService,
              private sessionStorageService: SessionStorageService) {}

  ngOnInit() {
    this.homeUIService.currentUser$.subscribe(user => {
      this.currentUser = user;
    });

    if (this.sessionStorageService.getToken()) {
      this.currentUser = this.sessionStorageService.getUser();
      this.homeUIService.setCurrentUser(this.currentUser);
    }
  }

  toggleSubMenu(): void {
    this.showSubMenu = !this.showSubMenu;
  }

  toggleMenuUser(): void {
    this.showMenuUser = !this.showMenuUser;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const isClickedInsideMenu = (event.target as HTMLElement).closest('.border-indigo-400') !== null;
    if (!isClickedInsideMenu) {
      this.showMenuUser = false;
    }
  }

  signOut() {
    this.sessionStorageService.signOut();
  }

  onClickHome() {
    this.router.navigate(['/']);
  }
}