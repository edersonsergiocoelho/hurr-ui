import { Injectable } from '@angular/core';
import { UserPreference } from 'src/app/page/admin/user-preference/entity/user-preference.entity';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';
const USER_PREFERENCE_KEY = 'auth-user-preference';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    window.location.reload();
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY) as string;
  }

  public saveUser(user): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    return JSON.parse(sessionStorage.getItem(USER_KEY) as string);
  }

  public saveUserPreference(userPreference): void {
    window.sessionStorage.removeItem(USER_PREFERENCE_KEY);
    window.sessionStorage.setItem(USER_PREFERENCE_KEY, JSON.stringify(userPreference));
  }

  public getUserPreference(): UserPreference | null {
    const userPreferenceString = sessionStorage.getItem(USER_PREFERENCE_KEY);
    return userPreferenceString ? JSON.parse(userPreferenceString) as UserPreference : null;
  }
}