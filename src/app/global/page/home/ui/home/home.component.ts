import { Component, HostListener, OnInit } from '@angular/core';
import { first, firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeUIService } from '../../service/home-ui/home-ui.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { HomeUIDTO } from './dto/home-ui-dto.dto';
import { FileService } from 'src/app/page/file/service/file.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  homeUIDTO: HomeUIDTO;

  currentUser: any;
  showMenuUser: boolean = false;
  showSubMenu: boolean = false;

  constructor(private router: Router,
              private ngxSpinnerService: NgxSpinnerService,
              private homeUIService: HomeUIService,
              private sessionStorageService: SessionStorageService,
              private messageService: MessageService,
              private fileService: FileService,
              private translateService: TranslateService) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');

    this.homeUIService.currentUser$.subscribe(user => {
      this.currentUser = user;
      this.resetForm();
    });

    if (this.sessionStorageService.getToken()) {
      this.currentUser = this.sessionStorageService.getUser();
      this.homeUIService.setCurrentUser(this.currentUser);
    }

    this.resetForm();
  }

  resetForm() {

    this.homeUIDTO = new HomeUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      if (this.currentUser != null) {

        if (this.currentUser.photoFileId != null) {
          
          const fileServiceFindById = await firstValueFrom(this.fileService.findById(this.currentUser.photoFileId).pipe(first()));
          
          if (fileServiceFindById.status == 200) {
            if (fileServiceFindById.body != null) {
              
              this.homeUIDTO.file = fileServiceFindById.body;
              this.homeUIDTO.dataURI = `data:${this.homeUIDTO.file.contentType};base64,${fileServiceFindById.body.dataAsByteArray}`;
            }
          }
        }

      } else {
        this.homeUIDTO.dataURI = null;
      }

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.homeUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
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

  onClickCustomerValidation() {
    this.router.navigate(['/customer/customer-validation']);
  }

  onClickCustomerVehicleBooking() {
    this.router.navigate(['/customer-vehicle-booking']);
  }
}