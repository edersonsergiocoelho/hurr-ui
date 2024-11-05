import { Component, ViewChild } from '@angular/core';
import { UserPreferenceContentComponent } from '../user-preference-content/user-preference-content.component';

@Component({
  selector: 'app-user-preference',
  templateUrl: './user-preference.component.html',
  styleUrls: ['./user-preference.component.css']
})
export class UserPreferenceComponent {

  sidebarContentVisible: boolean = false;

  @ViewChild(UserPreferenceContentComponent) userPreferenceContentComponent!: UserPreferenceContentComponent;

  toggleSidebarContent() {
    this.sidebarContentVisible = !this.sidebarContentVisible;
  }
}