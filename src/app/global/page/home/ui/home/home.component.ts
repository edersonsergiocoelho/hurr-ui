import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
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
import { Menu } from 'src/app/page/admin/menu/entity/menu.entity';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  selectedBreadcrumb: any;

  onBreadcrumbClick(crumb: any): void {
    this.selectedBreadcrumb = crumb;
  }

  loadingText = 'Carregando';

  currentUser: any;
  homeUIDTO: HomeUIDTO;

  constructor(private cdr: ChangeDetectorRef,
    private router: Router,
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
            this.homeUIDTO.menuHeaders = menuServiceFindMeAll.body;
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

    try {

      if (this.currentUser != null) {
          
        const menuServiceFindMeAll = await firstValueFrom(this.menuService.findByTypeMenuMeAll('MENU_HEADER_ICON').pipe(first()));
        
        if (menuServiceFindMeAll.status == 200) {
          if (menuServiceFindMeAll.body != null) {
            this.homeUIDTO.menuHeaderIcons = menuServiceFindMeAll.body;
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

    try {

      if (this.currentUser != null) {
          
        const menuServiceFindMeAll = await firstValueFrom(this.menuService.findByTypeMenuMeAll('MENU_HEADER_DROPDOWN').pipe(first()));
        
        if (menuServiceFindMeAll.status == 200) {
          if (menuServiceFindMeAll.body != null) {
            this.homeUIDTO.menuHeaderDropdowns = menuServiceFindMeAll.body;
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

  breadcrumb: Array<{ name: string, url: string }> = [];

  // Método para atualizar o breadcrumb baseado no menu selecionado
  updateBreadcrumb(selectedMenu: any, menus: any): void {
    if (selectedMenu.url) {
      const breadcrumbPath = this.buildBreadcrumbPath(selectedMenu, menus);
      this.breadcrumb = breadcrumbPath;
      this.onBreadcrumbClick({ name: selectedMenu.name, url: selectedMenu.url })
      this.cdr.detectChanges();
    }
  }

  // Método recursivo para construir o caminho do breadcrumb
  buildBreadcrumbPath(menu: any, menus: any, path: Array<{ name: string, url: string }> = []): Array<{ name: string, url: string }> {
    // Adiciona o menu atual ao início do caminho
    path.unshift({ name: menu.name, url: menu.url });

    // Procura o menu pai
    const parentMenu = this.findParentMenu(menu.menuParentId, menus);
    if (parentMenu) {
      return this.buildBreadcrumbPath(parentMenu, menus, path);
    }

    return path;
  }

  // Método recursivo para encontrar o menu pai no array de headers
  findParentMenu(parentId: string | null, menus: any[]): any {
    for (let menu of menus) {
      if (menu.menuId === parentId) {
        return menu;
      }
      if (menu.subMenus && menu.subMenus.length > 0) {
        const foundParentMenu = this.findParentMenu(parentId, menu.subMenus);
        if (foundParentMenu) {
          return foundParentMenu;
        }
      }
    }
    return null;
  }

  isSelected(crumb: { name: string, url: string }): boolean {
    return this.selectedBreadcrumb
      ? this.selectedBreadcrumb.name === crumb.name && this.selectedBreadcrumb.url === crumb.url
      : false;
  }

  toggleMenuHeader(menu: Menu): void {
    menu.showSubMenu = !menu.showSubMenu;

    this.updateBreadcrumb(menu, this.homeUIDTO.menuHeaders);
  }

  toggleMenuHeaderDropDown(menu: Menu): void {
    menu.showSubMenu = !menu.showSubMenu;

    this.updateBreadcrumb(menu, this.homeUIDTO.menuHeaderDropdowns);
  }

  toggleMenuHeaderDropDownShowMenu(): void {
    this.homeUIDTO.menuHeaderDropDownShowMenu = !this.homeUIDTO.menuHeaderDropDownShowMenu;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    const isClickedInsideMenu = clickedElement.closest('.border-indigo-400') !== null;
    const isClickedInsideDropdown = clickedElement.closest('.p-element') !== null;
  
    if (!isClickedInsideMenu && !isClickedInsideDropdown) {
      this.homeUIDTO.menuHeaderDropDownShowMenu = false;
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