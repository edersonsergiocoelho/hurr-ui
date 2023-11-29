import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/commom/app.constants';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { UserService } from '../../service/user.service';

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
              private authService: AuthService,
              private sessionStorageService: SessionStorageService,
              private userService: UserService) { }

  ngOnInit(): void {
    const token: string = this.activatedRoute.snapshot.queryParamMap.get('token') as string;
    const error: string = this.activatedRoute.snapshot.queryParamMap.get('error') as string;

    if (this.sessionStorageService.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.sessionStorageService.getUser();
    } else if (token) {
      this.sessionStorageService.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data);
        },
        err => {
          this.errorMessage = err.error.message;
          this.isLoginFailed = true;
        }
      );
    } else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  onSubmit(): void {
    this.authService.signin(this.form).subscribe(
      (data: any) => {
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
    this.sessionStorageService.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.sessionStorageService.getUser();
    this.router.navigate(['/home']);
  }

  loginGoogle() {
    window.location.href = this.googleURL;
  }
}