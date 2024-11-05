import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserProfileContentUIDTO } from './dto/user-profile-content-ui-dto.dto';
import { UserService } from '../../service/user.service';
import { MessageService } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { TranslateService } from '@ngx-translate/core';
import { first, firstValueFrom } from 'rxjs';
import { SeverityConstants } from 'src/app/commom/severity.constants';
import { FileUpload } from 'primeng/fileupload';
import { UserDTO } from '../../dto/user-dto.dto';
import { SessionStorageService } from 'src/app/core/session-storage/service/session-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-user-profile-content',
  templateUrl: './user-profile-content.component.html',
  styleUrls: ['./user-profile-content.component.css']
})
export class UserProfileContentComponent implements OnInit {

  userProfileContentUIDTO: UserProfileContentUIDTO;
  userProfileContentForm: NgForm;
  labelSize: string = 'text-base';
  inputSize: string = 'p-inputtext-md';
  buttonSize: string = 'p-button-md';

  @ViewChild('fileUpload') fileUpload: FileUpload;

  constructor(
    private messageService: MessageService, // Serviço para exibir mensagens para o usuário
    private ngxSpinnerService: NgxSpinnerService, // Serviço para mostrar e esconder o spinner de carregamento
    private userService: UserService, // Serviço para realizar operações CRUD de status de pagamento
    private translateService: TranslateService, // Serviço para tradução de textos
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    // Método chamado quando o componente é inicializado.
    this.resetContentForm(); // Reseta o formulário e configurações
  }

  resetContentForm(): void {
    // Inicializa o UIDTO e o DTO para o status de pagamento.
    this.userProfileContentUIDTO = new UserProfileContentUIDTO();
    this.userProfileContentUIDTO.userDTO = new UserDTO();

    //this.userProfileContentUIDTO.uploadedFiles = [];
    //this.userProfileContentUIDTO.files = [];

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
      this.userProfileContentUIDTO.warn_summary_message_service_Generic = translations['warn_summary_message_service_Generic'];
      this.userProfileContentUIDTO.error_summary_message_service_Generic = translations['error_summary_message_service_Generic'];
      this.userProfileContentUIDTO.info_summary_message_service_Generic = translations['info_summary_message_service_Generic'];
      this.userProfileContentUIDTO.success_summary_message_service_Generic = translations['success_summary_message_service_Generic'];

      this.userProfileContentUIDTO.update_profile_summary_message_service_UserProfileContent = translations['update_profile_summary_message_service_UserProfileContent'];
      this.userProfileContentUIDTO.update_profile_detail_message_service_UserProfileContent = translations['update_profile_detail_message_service_UserProfileContent'];

      const currentUser = this.sessionStorageService.getUser();

      // Realiza chamadas assíncronas para carregar dados de arquivos e menus
      const [userServiceGetCurrentUser] = await Promise.all([
        firstValueFrom(this.userService.findById(currentUser.userId).pipe(first())),
      ]);

      if (userServiceGetCurrentUser.status == 200 && userServiceGetCurrentUser.body != null) {
        this.userProfileContentUIDTO.userDTO = userServiceGetCurrentUser.body;

        if (this.userProfileContentUIDTO.userDTO.createdDate != null) {
          this.userProfileContentUIDTO.userDTO.createdDate = moment(this.userProfileContentUIDTO.userDTO.createdDate).toDate();
        }
        if (this.userProfileContentUIDTO.userDTO.modifiedDate != null) {
          this.userProfileContentUIDTO.userDTO.modifiedDate = moment(this.userProfileContentUIDTO.userDTO.modifiedDate).toDate();
        }

        if (this.userProfileContentUIDTO.userDTO.file != null) {
          this.userProfileContentUIDTO.userDTO.file.dataURI = `data:${this.userProfileContentUIDTO.userDTO.file.contentType};base64,${this.userProfileContentUIDTO.userDTO.file.dataAsByteArray}`;
        }
      }

    } catch (error: any) {
      // Exibe uma mensagem de erro caso ocorra uma falha ao carregar as traduções.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userProfileContentUIDTO.error_summary_message_service_Generic,
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
      'update_profile_summary_message_service_UserProfileContent',
      'update_profile_detail_message_service_UserProfileContent'
    ];
  }

  async ngSubmit(): Promise<void> {
    // Método chamado ao submeter o formulário para salvar um novo status de pagamento.

    this.ngxSpinnerService.show(); // Exibe o spinner de carregamento.

    const user = UserDTO.toEntity(this.userProfileContentUIDTO.userDTO);

    if (this.userProfileContentUIDTO.files != null && this.userProfileContentUIDTO.files.length > 0) {
      user.file = this.userProfileContentUIDTO.files[0];
    }

    try {
      // Usando await com firstValueFrom para aguardar a resposta do serviço de salvar.
      const data = await firstValueFrom(this.userService.update(user).pipe(first()));

      if (data.status === 200) {
        // Exibe mensagem de sucesso se o status da resposta for 201 Created.
        this.messageService.add({ 
          severity: SeverityConstants.SUCCESS, 
          summary: this.userProfileContentUIDTO.update_profile_summary_message_service_UserProfileContent, 
          detail: this.userProfileContentUIDTO.update_profile_detail_message_service_UserProfileContent 
        });
      }
  
    } catch (error: any) {
      // Exibe mensagem de erro em caso de falha.
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.userProfileContentUIDTO.error_summary_message_service_Generic,
        detail: error.error?.message || error.toString()
      });

    } finally {
      // Esconde o spinner após a conclusão da operação.
      this.resetContentForm();
      this.fileUpload.clear();
      this.ngxSpinnerService.hide();
    }
  }

  uploadHandlerFile(event: any): void {

    this.userProfileContentUIDTO.uploadedFiles = [];
    this.userProfileContentUIDTO.files = [];

    for (let file of event.files) {

      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {

        this.userProfileContentUIDTO.uploadedFiles.push(file);

        const base64String = (reader.result as string).split(',')[1];

        const customerVehicleFilePhoto = {
          contentType: file.type,
          originalFileName: file.name,
          dataAsByteArray: base64String,
          dataURI: `data:${file.type};base64,${base64String}`
        };

        this.userProfileContentUIDTO.files.push(customerVehicleFilePhoto);
      };
    }
  }
}