import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { MessageService } from 'primeng/api';
import { UserRoleService } from '../../service/user-role.service';
import { UserRoleEditRoleUIDTO } from './dto/user-role-edit-role-ui-dto.dto';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { first, firstValueFrom } from 'rxjs';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-role-edit-role-component',
  templateUrl: './user-role-edit-role-component.component.html',
  styleUrls: ['./user-role-edit-role-component.component.css']
})
export class UserRoleEditRoleComponentComponent implements OnInit {

  userRoleEditRoleUIDTO: UserRoleEditRoleUIDTO;

  constructor(private ngxSpinnerService: NgxSpinnerService,
    private messageService: MessageService,
    private translateService: TranslateService,
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private userRoleService: UserRoleService) { }

  ngOnInit (): void {
    this.resetRegisterForm();
  }

  resetRegisterForm () {

    this.userRoleEditRoleUIDTO = new UserRoleEditRoleUIDTO();

    this.asyncCallFunctions();
  }

  async asyncCallFunctions(): Promise<void> {
    // Método para carregar as traduções e outras configurações assíncronas.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Carrega as traduções necessárias para os textos da interface.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO.
      this.userRoleEditRoleUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.userRoleEditRoleUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.userRoleEditRoleUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.userRoleEditRoleUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.userRoleEditRoleUIDTO.become_vehicle_partner_summary_message_service_UserRoleEditRole = translations['become_vehicle_partner_summary_message_service_UserRoleEditRole'];
      this.userRoleEditRoleUIDTO.become_vehicle_partner_detail_message_service_UserRoleEditRole = translations['become_vehicle_partner_detail_message_service_UserRoleEditRole'];

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userRoleEditRoleUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });
    } finally {
      // Esconde o spinner após a conclusão da carga dos dados.
      this.ngxSpinnerService.hide();
    }
  }

  private loadKeys(): string[] {
    // Define as chaves para tradução que serão carregadas.
    return [
      'warn_summary_message_service_Generic',
      'error_summary_message_service_Generic',
      'info_summary_message_service_Generic',
      'success_summary_message_service_Generic',
      'become_vehicle_partner_summary_message_service_UserRoleEditRole',
      'become_vehicle_partner_detail_message_service_UserRoleEditRole'
    ];
  }

  sidebarSearchVisible: boolean = false;

  toggleSidebarSearch() {
    this.sidebarSearchVisible = !this.sidebarSearchVisible;
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.userRoleService.becomeVehiclePartner().pipe(first()));

      if (data.status === 204) {
        
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.userRoleEditRoleUIDTO.become_vehicle_partner_summary_message_service_UserRoleEditRole, 
          detail: this.userRoleEditRoleUIDTO.become_vehicle_partner_detail_message_service_UserRoleEditRole 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userRoleEditRoleUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetRegisterForm();
      this.ngxSpinnerService.hide();

      this.router.navigate(['user/login']);

      setTimeout(() => {
        this.sessionStorageService.signOut();
      }, 3000);
    }
  }
}