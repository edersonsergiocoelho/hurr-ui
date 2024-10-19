import { Component, ViewChild } from '@angular/core';
import { UserProfileContentComponent } from '../user-profile-content/user-profile-content.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent {

  sidebarContentVisible: boolean = false;

  @ViewChild(UserProfileContentComponent) userProfileContentComponent!: UserProfileContentComponent;

  toggleSidebarContent() {
    this.sidebarContentVisible = !this.sidebarContentVisible;
  }
}