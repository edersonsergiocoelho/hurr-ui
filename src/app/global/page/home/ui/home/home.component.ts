import { Component, HostListener, OnInit } from '@angular/core';
import { first, firstValueFrom, interval } from 'rxjs';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { HomeUIService } from '../../service/home-ui/home-ui.service';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { HomeUIDTO } from './dto/home-ui-dto.dto';
import { FileService } from 'src/app/page/file/service/file.service';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { MenuService } from 'src/app/page/admin/menu/service/menu.service';
import { MenuDTO } from 'src/app/page/admin/menu/dto/menu-dto.dto';
import { Menu } from 'src/app/page/admin/menu/entity/menu.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  menus: Menu[] = [];

  loadingText = 'Carregando';

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
              private translateService: TranslateService, 
            private menuService: MenuService) {}

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');

    const interval$ = interval(2000);
    let count = 0;

    interval$.subscribe(() => {
      count++;
      if (count <= 3) {
        this.loadingText += '.';
      } else {
        this.loadingText = 'Carregando';
        count = 0;
      }
    });

    this.homeUIService.currentUser$.subscribe(user => {
      this.currentUser = user;
      //this.resetForm();
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

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.homeUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    try {

      if (this.currentUser != null) {
          
        const menuServiceFindMeAll = await firstValueFrom(this.menuService.findByTypeMenuMeAll('MENU_HEADER').pipe(first()));
        
        if (menuServiceFindMeAll.status == 200) {
          if (menuServiceFindMeAll.body != null) {
            this.homeUIDTO.menusHeader = menuServiceFindMeAll.body;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({
          severity: SeverityConstants.ERROR,
          summary: '' + this.homeUIDTO.error_message_service_Generic,
          detail: error.toString()
        });
      }
    }

    this.ngxSpinnerService.hide();
  }

  toggleMenu(menu: Menu): void {
    menu.showSubMenu = !menu.showSubMenu;
  }

  toggleSubMenuTest(): void {
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

  onClickCustomerVehicleBookingCustomerVehicle() {
    this.router.navigate(['/customer-vehicle-booking/customer-vehicle']);
  }

  navigateToEarnings() {
    this.router.navigate(['/earnings']);
  }
}