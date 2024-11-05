import { CustomervehicleRegisterStep } from "./customer-vehicle-register-step";

export class CustomerVehicleRegisterUIDTO {

  customervehicleRegisterSteps: CustomervehicleRegisterStep[] = [
    { label: 'Região', icon: 'pi pi-globe', description: 'Verificar A Região', isCompleted: false },
    { label: 'Veículo', icon: 'pi pi-car', description: 'Informações Do Veículo', isCompleted: false },
    { label: 'Transmissão E Quilometragem', icon: 'pi pi-gauge', description: 'Informações De Transmissão E Quilometragem', isCompleted: false },
    { label: 'Valor', icon: 'pi pi-money-bill', description: 'Informe O Valor Do Veículo', isCompleted: false },
    { label: 'Detalhes Do Veículo', icon: 'pi pi-car', description: 'Informe Os Detalhes Do Veículo', isCompleted: false },
    { label: 'Fotos', icon: 'pi pi-car', description: 'Upload Das Imagens Do Veículo', isCompleted: false },
    { label: 'Seguro', icon: 'pi pi-car', description: 'Upload Do Contrato Do Veículo', isCompleted: false }
  ];

  currentStepIndex: number = 0;

  // Messages - Translate
  error_summary_message_service_Generic: string;
  warn_summary_message_service_Generic: string;
  span_button_label_save_Generic: string;
  span_button_label_cancel_Generic: string;
  header_ConfirmDialog_CustomerVehicleRegister: string;
  message_ConfirmDialog_CustomerVehicleRegister: string;
  reject_summary_message_service_ConfirmDialog_CustomerVehicleRegister: string;
  reject_detail_message_service_ConfirmDialog_CustomerVehicleRegister: string;
  save_summary_message_service_Generic: string;
  save_success_message_service_CustomerVehicleRegister: string;
}