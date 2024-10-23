import { ChangeDetectorRef, Component, HostListener, OnInit } from '@angular/core';
import { first, firstValueFrom, interval } from 'rxjs';
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
import { CustomerVehicleFilePhotoService } from 'src/app/page/customer-vehicle-file-photo/service/customer-vehicle-file-photo.service';
import { CustomerVehicleService } from '../../../customer-vehicle/service/customer-vehicle.service';
import { Router } from '@angular/router';
import { ThemeService } from 'src/app/global/template/theme/service/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  customerVehicleId: string | null;
  searchQuery: string = ''; // Propriedade para armazenar o termo de pesquisa
  homeUIDTO: HomeUIDTO;

  constructor(
    private cdr: ChangeDetectorRef, // Usado para detectar e aplicar mudanças na view manualmente
    private customerVehicleService: CustomerVehicleService,
    private customerVehicleFilePhotoService: CustomerVehicleFilePhotoService,
    private fileService: FileService, // Serviço para operações com arquivos
    private homeUIService: HomeUIService, // Serviço para gerenciar a UI da Home
    private menuService: MenuService, // Serviço para operações com menus
    private messageService: MessageService, // Serviço para exibir mensagens ao usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para exibir um spinner de carregamento
    private sessionStorageService: SessionStorageService, // Serviço para manipular a sessão de armazenamento
    private translateService: TranslateService, // Serviço para manipular traduções
    private themeService: ThemeService,
    private router: Router
  ) {
    this.homeUIDTO = new HomeUIDTO(); // Inicializa o DTO (Data Transfer Object) para armazenar dados da UI

    // Inscreve-se para atualizações do usuário atual e reseta o formulário
    this.homeUIService.currentUser$.subscribe(user => {
      this.homeUIDTO.currentUser = user;
      this.resetForm();
    });

    // Inscreva-se para receber atualizações do customerVehicleId
    this.homeUIService.customerVehicleId$.subscribe(customerVehicleId => {
      this.customerVehicleId = customerVehicleId;
      this.loadCustomerVehicle();
    });
  }

  ngOnInit() {

    // Se há um token armazenado, carrega o usuário da sessão
    if (this.sessionStorageService.getToken()) {
      this.homeUIDTO.currentUser = this.sessionStorageService.getUser();
      this.homeUIService.setCurrentUser(this.homeUIDTO.currentUser);
    }

    const currentUserPreference = this.sessionStorageService.getUserPreference();

    if (currentUserPreference != null) {
      if (currentUserPreference.language != null) {
        this.translateService.setDefaultLang(currentUserPreference.language);
      }

      if (currentUserPreference.theme != null) {
        this.themeService.switchTheme(currentUserPreference.theme);
      }
    } else {
      this.translateService.setDefaultLang('pt_BR');
      this.themeService.switchTheme("lara-light-purple");
    }

    this.resetForm(); // Reseta o formulário após a inicialização
  }

  resetForm() {
    // Chama funções assíncronas para carregar dados
    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {

    // Exibe o spinner de carregamento
    this.ngxSpinnerService.show();

    try {
      // Carrega traduções para mensagens de serviço
      const keys = [
        'warn_summary_message_service_Generic',
        'error_summary_message_service_Generic',
        'info_summary_message_service_Generic',
        'success_summary_message_service_Generic',
        'label_loading_Generic'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.homeUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.homeUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.homeUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.homeUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];
      this.homeUIDTO.label_loading_Generic = translations['label_loading_Generic'];

    } catch (error: any) {
      // Exibe uma mensagem de erro em caso de falha ao carregar traduções
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: '' + this.homeUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
      });
    }

    // Inicializa um indicador de carregamento animado
    this.initializeLoadingIndicator();

    try {
      // Realiza chamadas assíncronas para carregar dados de arquivos e menus
      const [fileData, menuHeaders, menuHeaderIcons, menuHeaderDropdowns, menuSides, menuSideSettings, menuSideCustomerVehicleEdits] = await Promise.all([
        this.loadUserFile(), // Carrega o arquivo de foto do usuário
        this.loadMenus('MENU_HEADER'), // Carrega os cabeçalhos de menu
        this.loadMenus('MENU_HEADER_ICON'), // Carrega ícones de cabeçalhos de menu
        this.loadMenus('MENU_HEADER_DROPDOWN'), // Carrega menus suspensos dos cabeçalhos
        this.loadMenus('MENU_SIDE'),
        this.loadMenus('MENU_SIDE_SETTINGS'),
        this.loadMenus('MENU_SIDE_CUSTOMER_VEHICLE_EDIT')
      ]);

      // Atualiza o DTO com os dados carregados
      if (fileData) {
        this.homeUIDTO.file = fileData.file;
        this.homeUIDTO.dataURI = fileData.dataURI;
      } else {
        this.homeUIDTO.dataURI = null;
      }

      if (menuHeaders) {
        this.homeUIDTO.menuHeaders = menuHeaders;
      }
      if (menuHeaderIcons) {
        this.homeUIDTO.menuHeaderIcons = menuHeaderIcons;
      }
      if (menuHeaderDropdowns) {
        this.homeUIDTO.menuHeaderDropdowns = menuHeaderDropdowns;
      }

      if (menuSides) {
        this.homeUIDTO.menuSides = menuSides;
      }

      if (menuSideSettings) {
        this.homeUIDTO.menuSideSettings = menuSideSettings;
      }

      if (menuSideCustomerVehicleEdits) {
        this.homeUIDTO.menuSideCustomerVehicleEdits = menuSideCustomerVehicleEdits;
      }

    } catch (error: any) {

      // Exibe uma mensagem de erro em caso de falha ao carregar menus
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.homeUIDTO.error_summary_message_service_Generic,
        detail: error.toString()
      });

      // Oculta o spinner de carregamento
      this.ngxSpinnerService.hide();

    } finally {
      // Oculta o spinner de carregamento
      this.ngxSpinnerService.hide();
    }
  }

  initializeLoadingIndicator() {
    // Cria um indicador de carregamento animado que adiciona um ponto a cada 2 segundos
    const interval$ = interval(2000);
    let count = 0;
    let label_loading_Base = this.homeUIDTO.label_loading_Generic;
  
    interval$.subscribe(() => {
      // Se count é 0, resetar a string para o texto base sem pontos
      if (count === 0) {
        this.homeUIDTO.label_loading_Generic = label_loading_Base;
      }
  
      // Adiciona um ponto ao texto base
      this.homeUIDTO.label_loading_Generic += '.';
  
      // Incrementa count, e reseta para 0 quando atingir 3
      count = (count + 1) % 4;
    });
  }

  async loadUserFile(): Promise<any> {
    // Carrega o arquivo de foto do usuário, se existir
    if (this.homeUIDTO.currentUser && this.homeUIDTO.currentUser.photoFileId) {
      const fileResponse = await firstValueFrom(this.fileService.findById(this.homeUIDTO.currentUser.photoFileId).pipe(first()));
      if (fileResponse.status === 200 && fileResponse.body) {
        return {
          file: fileResponse.body,
          dataURI: `data:${fileResponse.body.contentType};base64,${fileResponse.body.dataAsByteArray}`
        };
      }
    }
    return null; // Retorna null se não houver arquivo ou em caso de erro
  }

  async loadMenus(type: string): Promise<any> {
    // Carrega menus de acordo com o tipo fornecido
    if (this.homeUIDTO.currentUser) {
      const response = await firstValueFrom(this.menuService.findByTypeMenuMeAll(type).pipe(first()));
      if (response.status === 200) {
        return response.body; // Retorna os menus carregados
      }
    }
    return null; // Retorna null em caso de erro ou ausência de menus
  }

  async loadCustomerVehicle() {

    try {

      if (this.customerVehicleId != null) {

        const customerVehicleServiceFindById = await firstValueFrom(this.customerVehicleService.findById(this.customerVehicleId).pipe(first()));

        if (customerVehicleServiceFindById.status == 200) {
          if (customerVehicleServiceFindById.body != null) {
            this.homeUIDTO.customerVehicle = customerVehicleServiceFindById.body;
          }
        }

        const customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto = await firstValueFrom(this.customerVehicleFilePhotoService.findByCustomerVehicleAndCoverPhoto(this.customerVehicleId).pipe(first()));
          
        if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.status == 200) {
          if (customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body != null) {
            this.homeUIDTO.customerVehicleFilePhoto = customerVehicleFilePhotoServiceFindByCustomerVehicleAndCoverPhoto.body;
            this.homeUIDTO.customerVehicleFilePhoto.dataURI = `data:${this.homeUIDTO.customerVehicleFilePhoto.contentType};base64,${this.homeUIDTO.customerVehicleFilePhoto.dataAsByteArray}`;
          }
        }
      }

    } catch (error: any) {

      if (error.status == 500) {

        this.messageService.add({ 
          severity: SeverityConstants.ERROR, 
          summary: '' + this.homeUIDTO.error_summary_message_service_Generic,
          detail: error.toString() 
        });
      }
    }
  }

  updateBreadcrumb(selectedMenu: any, menus: any): void {
    // Atualiza o breadcrumb (navegação de trilha) com base no menu selecionado
    if (selectedMenu.url) {
      const breadcrumbPath = this.buildBreadcrumbPath(selectedMenu, menus);
      this.homeUIDTO.breadcrumbs = breadcrumbPath;
      this.onBreadcrumbClick({ name: selectedMenu.name, url: selectedMenu.url });
      this.cdr.detectChanges(); // Aplica mudanças na view
    }
  }

  buildBreadcrumbPath(menu: any, menus: any, path: Array<{ name: string, url: string }> = []): Array<{ name: string, url: string }> {
    // Constrói o caminho do breadcrumb recursivamente
    path.unshift({ name: menu.name, url: menu.url });

    const parentMenu = this.findParentMenu(menu.menuParentId, menus);
    if (parentMenu) {
      return this.buildBreadcrumbPath(parentMenu, menus, path);
    }

    return path; // Retorna o caminho completo do breadcrumb
  }

  findParentMenu(parentId: string | null, menus: any[]): any {
    // Encontra o menu pai baseado no ID
    for (let menu of menus) {
      if (menu.menuId === parentId) {
        return menu; // Retorna o menu pai se encontrado
      }
      if (menu.subMenus && menu.subMenus.length > 0) {
        const foundParentMenu = this.findParentMenu(parentId, menu.subMenus);
        if (foundParentMenu) {
          return foundParentMenu; // Retorna o menu pai de um submenu, se encontrado
        }
      }
    }
    return null; // Retorna null se não encontrar um menu pai
  }

  onBreadcrumbClick(crumb: any): void {
    // Atualiza o breadcrumb selecionado ao clicar em um item
    this.homeUIDTO.selectedBreadcrumb = crumb;
  }

  isSelected(breadcrumb: { name: string, url: string }): boolean {
    // Verifica se há um breadcrumb selecionado
    return this.homeUIDTO.selectedBreadcrumb
      ? // Compara o nome e a URL do breadcrumb selecionado com o breadcrumb passado
        this.homeUIDTO.selectedBreadcrumb.name === breadcrumb.name && this.homeUIDTO.selectedBreadcrumb.url === breadcrumb.url
      : // Se não houver um breadcrumb selecionado, retorna false
        false;
  }

  toggleMenuHeader(menu: Menu): void {
    // Alterna a visibilidade dos submenus
    menu.showSubMenu = !menu.showSubMenu;

    // Atualiza o breadcrumb com base no menu clicado
    this.updateBreadcrumb(menu, this.homeUIDTO.menuHeaders);
  }

  toggleMenuHeaderDropDown(menu: Menu): void {
    // Alterna a visibilidade dos submenus
    menu.showSubMenu = !menu.showSubMenu;

    // Atualiza o breadcrumb com base no menu suspenso clicado
    this.updateBreadcrumb(menu, this.homeUIDTO.menuHeaderDropdowns);
  }

  toggleMenuHeaderDropDownShowMenu(): void {
    // Alterna a visibilidade do menu suspenso
    this.homeUIDTO.menuHeaderDropDownShowMenu = !this.homeUIDTO.menuHeaderDropDownShowMenu;
  }

  filterMenuSideCustomerVehicleEdit(menuItems: any[]): any[] {
    if (!this.searchQuery.trim()) {
      return menuItems; // Retorna todos os itens se a pesquisa estiver vazia
    }
    return menuItems.filter(menu => {
      return menu.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
             (menu.subMenus && this.filterMenuSideCustomerVehicleEdit(menu.subMenus).length > 0);
    });
  }

  toggleMenuSide(menu: Menu): void {
    // Alterna a visibilidade dos submenus
    menu.showSubMenu = !menu.showSubMenu;

    // Atualiza o breadcrumb com base no menu clicado
    this.updateBreadcrumb(menu, this.homeUIDTO.menuSides);
  }

  toggleMenuSideCustomerVehicleEdit(menu: Menu): void {
    // Alterna a visibilidade dos submenus
    menu.showSubMenu = !menu.showSubMenu;

    // Atualiza o breadcrumb com base no menu clicado
    this.updateBreadcrumb(menu, this.homeUIDTO.menuSideCustomerVehicleEdits);
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent): void {
    const clickedElement = event.target as HTMLElement;
    // Verifica se o clique foi dentro do menu ou do dropdown
    const isClickedInsideMenu = clickedElement.closest('.border-indigo-400') !== null;
    const isClickedInsideDropdown = clickedElement.closest('.p-element') !== null;

    // Se o clique foi fora do menu e do dropdown, oculta o menu suspenso
    if (!isClickedInsideMenu && !isClickedInsideDropdown) {
      this.homeUIDTO.menuHeaderDropDownShowMenu = false;
    }
  }

  signOut() {
    // Chama o serviço de sessão para realizar o logout
    this.sessionStorageService.signOut();
  }

  isCustomerVehicleEdit(): boolean {
    const currentUrl = this.router.url;
    // Verifica se a URL contém o caminho base seguido por um ID
    return currentUrl.includes('/customer-vehicle/edit/') && currentUrl.split('/').length == 5;
  }

  isVisibleMenuSide(): boolean {
    const currentUrl = this.router.url;
  
    // Verifica se existe um array de menus carregados e percorre para verificar se a URL atual está presente
    if (this.homeUIDTO.menuSides && this.homeUIDTO.menuSides.length > 0) {
      return this.homeUIDTO.menuSides.some((menuSide: any) => currentUrl.includes(menuSide.url));
    }
  
    // Retorna falso se não houver menus ou a URL não corresponder a nenhuma
    return false;
  }

  isSettings(): boolean {
    const currentUrl = this.router.url;
    return currentUrl.includes('/settings/');
  }

  clickRouterNavigateCustomerVehicle() {
    this.router.navigate(['customer-vehicle']);
  }
}