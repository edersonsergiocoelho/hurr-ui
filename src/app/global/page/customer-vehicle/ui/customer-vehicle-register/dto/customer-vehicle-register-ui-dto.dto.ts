import { Address } from "src/app/global/page/address/entity/address.entity";
import { Country } from "src/app/page/admin/country/entity/country.entity";
import { Step } from "./step";

export class CustomerVehicleRegisterUIDTO {

  steps: Step[] = [
    { label: 'Região', icon: 'pi pi-globe', description: 'Verificar A Região', isCompleted: false },
    { label: 'Veículo', icon: 'pi pi-car', description: 'Informações Do Veículo', isCompleted: false },
    { label: 'Transmissão E Quilometragem', icon: 'pi pi-gauge', description: 'Informações De Transmissão E Quilometragem', isCompleted: false },
    { label: 'Valor', icon: 'pi pi-money-bill', description: 'Informe O Valor Do Veículo', isCompleted: false },
    { label: 'Detalhes Do Veículo', icon: 'pi pi-car', description: 'Informe Os Detalhes Do Veículo', isCompleted: false },
    { label: 'Detalhes Do Veículo', icon: 'pi pi-car', description: 'Informe Os Detalhes Do Veículo', isCompleted: false },
  ];

  currentStepIndex: number = 1;
}