import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserPreferenceContentUIDTO } from './dto/user-preference-content-ui-dto.dto';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import { UserPreferenceService } from '../../service/user-preference.service';
import { UserPreferenceDTO } from '../../dto/user-preference-dto.dto';
import * as moment from 'moment';
import { ThemeService } from 'src/app/global/template/theme/service/theme.service';

@Component({
  selector: 'app-user-preference-content',
  templateUrl: './user-preference-content.component.html',
  styleUrls: ['./user-preference-content.component.css']
})
export class UserPreferenceContentComponent implements OnInit {

  userPreferenceContentUIDTO: UserPreferenceContentUIDTO;
  userPreferenceContentForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private userPreferenceService: UserPreferenceService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService, // Serviço para tradução de textos
    private themeService: ThemeService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetContentForm(); // Reseta o formulário e configurações
  }

  resetContentForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.userPreferenceContentUIDTO = new UserPreferenceContentUIDTO();
    this.userPreferenceContentUIDTO.userPreferenceDTO = new UserPreferenceDTO();

    // Chama funções assíncronas para carregar dados necessários.
    this.asyncCallFunctions();
  }

  async asyncCallFunctions(): Promise<void> {
    // Método para carregar as traduções e outras configurações assíncronas.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    try {
      // Carrega as traduções necessárias para os textos da interface.
      const translations = await firstValueFrom(this.translateService.get(this.loadKeys()).pipe(first()));

      // Atribui as traduções obtidas aos campos do UIDTO.
      this.userPreferenceContentUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.userPreferenceContentUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.userPreferenceContentUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.userPreferenceContentUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];

      this.userPreferenceContentUIDTO.update_preference_summary_message_service_UserPreferenceContent = translations['update_preference_summary_message_service_UserPreferenceContent'];
      this.userPreferenceContentUIDTO.update_preference_detail_message_service_UserPreferenceContent = translations['update_preference_detail_message_service_UserPreferenceContent'];
      this.userPreferenceContentUIDTO.update_preference_summary_message_service_UserPreferenceContent = translations['update_preference_summary_message_service_UserPreferenceContent'];
      this.userPreferenceContentUIDTO.update_preference_detail_message_service_UserPreferenceContent = translations['update_preference_detail_message_service_UserPreferenceContent'];

      this.userPreferenceContentUIDTO.languages = [
        { name: 'Português', code: 'pt_BR' },
        { name: 'Inglês', code: 'en_US' },
        { name: 'Espanhol', code: 'es_ES' }
      ];

      this.userPreferenceContentUIDTO.themes = this.themeService.getThemesGroupedByCategory();

      const currentUser = this.sessionStorageService.getUser();

      // Realiza chamadas assíncronas para carregar dados de arquivos e menus
      const [userServiceGetCurrentUser] = await Promise.all([
        firstValueFrom(this.userPreferenceService.findByUserId(currentUser.userId).pipe(first())),
      ]);

      if (userServiceGetCurrentUser.status == 200 && userServiceGetCurrentUser.body != null) {
        this.userPreferenceContentUIDTO.userPreferenceDTO = userServiceGetCurrentUser.body;

        if (this.userPreferenceContentUIDTO.userPreferenceDTO.createdDate != null) {
          this.userPreferenceContentUIDTO.userPreferenceDTO.createdDate = moment(this.userPreferenceContentUIDTO.userPreferenceDTO.createdDate).toDate();
        }
        if (this.userPreferenceContentUIDTO.userPreferenceDTO.modifiedDate != null) {
          this.userPreferenceContentUIDTO.userPreferenceDTO.modifiedDate = moment(this.userPreferenceContentUIDTO.userPreferenceDTO.modifiedDate).toDate();
        }

        const currentLanguage = this.userPreferenceContentUIDTO.userPreferenceDTO.language;
        const selectedCurrentLanguage = this.userPreferenceContentUIDTO.languages.find(language => language.code === currentLanguage);
        
        if (selectedCurrentLanguage) {
          this.userPreferenceContentUIDTO.selectedLanguage = selectedCurrentLanguage;
        }

        this.userPreferenceContentUIDTO.selectedTheme = this.userPreferenceContentUIDTO.userPreferenceDTO.theme;
      }

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userPreferenceContentUIDTO.error_message_service_Generic,
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
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'save_preference_summary_message_service_UserPreferenceContent',
      'save_preference_detail_message_service_UserPreferenceContent',
      'update_preference_summary_message_service_UserPreferenceContent',
      'update_preference_detail_message_service_UserPreferenceContent'
    ];
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const userPreference = UserPreferenceDTO.toEntity(this.userPreferenceContentUIDTO.userPreferenceDTO);

    if (this.userPreferenceContentUIDTO.selectedLanguage != null) {
      userPreference.language = this.userPreferenceContentUIDTO.selectedLanguage.code;
      this.translateService.setDefaultLang(this.userPreferenceContentUIDTO.selectedLanguage.code);
    }

    if (this.userPreferenceContentUIDTO.selectedTheme != null) {
      userPreference.theme = this.userPreferenceContentUIDTO.selectedTheme;
      this.themeService.switchTheme(this.userPreferenceContentUIDTO.selectedTheme);
    }

    try {

      let data;

      if (userPreference.userPreferenceId == null) {
        // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
        data = await firstValueFrom(this.userPreferenceService.save(userPreference).pipe(first()));
      } else {
        // Usando await com firstValueFrom para aguardar a resposta do serviço de atualizar.
        data = await firstValueFrom(this.userPreferenceService.update(userPreference).pipe(first()));
      }

      if (data.status === 201) {

        this.sessionStorageService.saveUserPreference(data.body);

        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.userPreferenceContentUIDTO.save_preference_summary_message_service_UserPreferenceContent, 
          detail: this.userPreferenceContentUIDTO.save_preference_detail_message_service_UserPreferenceContent 
        });
      }

      if (data.status === 200) {

        this.sessionStorageService.saveUserPreference(data.body);

        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.userPreferenceContentUIDTO.update_preference_summary_message_service_UserPreferenceContent, 
          detail: this.userPreferenceContentUIDTO.update_preference_detail_message_service_UserPreferenceContent 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userPreferenceContentUIDTO.error_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetContentForm();
      this.ngxSpinnerService.hide();
    }
  }
}