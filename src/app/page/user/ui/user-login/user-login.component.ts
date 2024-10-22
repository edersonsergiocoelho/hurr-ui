import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppConstants } from 'src/app/commom/app.constants';
import { AuthService } from 'src/app/core/auth/service/auth.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { UserService } from '../../service/user.service';
import { HomeUIService } from 'src/app/global/page/home/service/home-ui/home-ui.service';
import { UserLoginUIDTO } from './dto/user-login.ui.dto.dto';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthSignInDTO } from 'src/app/core/auth/dto/auth-sign-in-dto.dto';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { UserPreferenceService } from 'src/app/page/admin/user-preference/service/user-preference.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent {

  userLoginUIDTO: UserLoginUIDTO;

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;
  linkedinURL = AppConstants.LINKEDIN_AUTH_URL;

  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService,
    private homeUIService: HomeUIService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private translateService: TranslateService,
    private userService: UserService,
    private userPreferenceService: UserPreferenceService,
    private messageService: MessageService,
    private ngxSpinnerService: NgxSpinnerService
  ) { }

  ngOnInit(): void {

    this.resetForm();

    const token: string = this.activatedRoute.snapshot.queryParamMap.get('token') as string;
    const error: string = this.activatedRoute.snapshot.queryParamMap.get('error') as string;

    if (this.sessionStorageService.getToken()) {

      this.isLoggedIn = true;
      this.currentUser = this.sessionStorageService.getUser();
      this.homeUIService.setCurrentUser(this.currentUser);

    } else if (token) {

      this.sessionStorageService.saveToken(token);
      this.userService.getCurrentUser().subscribe(
        data => {
          this.login(data.body);
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

  resetForm() {

    this.userLoginUIDTO = new UserLoginUIDTO();
    this.userLoginUIDTO.authSignInDTO = new AuthSignInDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {
    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento para o usuário.

    try {
      // Carrega as traduções necessárias.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções aos campos correspondentes.
      this.userLoginUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.userLoginUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.userLoginUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.userLoginUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

    } catch (error: any) {

      // Trata os erros de carregamento e exibe uma mensagem de erro.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userLoginUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Oculta o spinner de carregamento independentemente do resultado.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): string[] {
    // Define as chaves para tradução que serão carregadas.
    return [
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic'
    ];
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

  /*
  login(user: any): void {
    this.sessionStorageService.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.sessionStorageService.getUser();
    this.homeUIService.setCurrentUser(this.currentUser);
    this.router.navigate(['']);
  }
  */

  login(user: any): void {
    this.sessionStorageService.saveUser(user);

    // Chama o serviço para buscar as preferências do usuário
    this.userPreferenceService.findByUserId(user.userId).pipe(first()).subscribe({
      next: (userPreferences: any) => {
        // Salva as preferências do usuário no sessionStorage
        this.sessionStorageService.saveUserPreference(userPreferences.body);
      },
      error: (error) => {
        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: this.userLoginUIDTO.error_summary_message_service_Generic, 
          detail: error.error?.message || error.toString() 
        });
      },
      complete: () => {
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.currentUser = this.sessionStorageService.getUser();
        this.homeUIService.setCurrentUser(this.currentUser);
        this.router.navigate(['']);
      }
    });
  }

  loginGoogle() {
    window.location.href = this.googleURL;
  }

  signin() {

    this.authService.signin(this.userLoginUIDTO.authSignInDTO).pipe(first()).subscribe({
      next: (data: any) => {

        if (data.status == 200) {
          this.sessionStorageService.saveToken(data.body.accessToken);
          this.login(data.body.user);
        }

      },
      error: (error) => {

        if (error.status == 400) {
          
          this.messageService.add({ 
            severity: SeverityConstants.WARN, 
            summary: this.userLoginUIDTO.warn_summary_message_service_Generic, 
            detail: error.error?.message || error.toString()
          });
        }

        if (error.status == 500) {

          this.messageService.add({ 
            severity: SeverityConstants.ERROR, 
            summary: this.userLoginUIDTO.error_summary_message_service_Generic, 
            detail: error.error?.message || error.toString()
          });
        }

        this.ngxSpinnerService.hide();
      },
      complete: () => {
        this.ngxSpinnerService.hide();
      }
    });
  }

  navigateToUserRegister() {
    this.router.navigate(['user/register']);
  }

  navigateToUserForgotPassword() {
    this.router.navigate(['user/forgot-password']);
  }
}