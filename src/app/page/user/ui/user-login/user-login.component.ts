import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/commom/app.constants';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { UserService } from '../../service/user.service';
import { HomeUIService } from 'src/app/global/page/home/service/home-ui/home-ui.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private homeUIService: HomeUIService,
              private authService: AuthService,
              private sessionStorageService: SessionStorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    debugger;
    const token: string = this.activatedRoute.snapshot.queryParamMap.get('token') as string;
    const error: string = this.activatedRoute.snapshot.queryParamMap.get('error') as string;

    if (this.sessionStorageService.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.sessionStorageService.getUser();
    } else if (token) {
      this.sessionStorageService.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          debugger;
          this.login(data);
        },
        err => {
          debugger;
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else if (error) {
      debugger;
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    debugger;
    this.authService.signin(this.form).subscribe(
      (data: any) => {
        debugger;
        this.sessionStorageService.saveToken(data.accessToken);
        this.login(data.user);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  login(user: any): void {
    console.log("Passou No Login")
    debugger;
    this.sessionStorageService.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.sessionStorageService.getUser();
    this.router.navigate(['user/login']);
  }

  loginGoogle() {
    debugger;
    this.homeUIService.updateDivVisibility(false);
    window.location.href = this.googleURL;
  }
}