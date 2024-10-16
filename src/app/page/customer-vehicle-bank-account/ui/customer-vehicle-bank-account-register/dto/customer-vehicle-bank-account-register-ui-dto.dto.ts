import { Bank } from "src/app/page/admin/bank/entity/bank.entity";
import { CustomerVehicleBankAccountDTO } from "../../../dto/customer-vehicle-bank-account-dto.dto";
import { CustomerVehicleBankAccount } from "../../../entity/customer-vehicle-bank-account.entity";
import { TranslateMessageServiceDTO } from "src/app/core/translate/dto/translate-message-service-dto.dto";

export class CustomerVehicleBankAccountRegisterUIDTO extends TranslateMessageServiceDTO {

  customerVehicleBankAccountDTO: CustomerVehicleBankAccountDTO;
  customerVehicleBankAccountes: Array<CustomerVehicleBankAccount>;

  banks: Array<Bank>;
  selectedBank: Bank;

  pixTypes: PIXType[];
  selectedPIXType: PIXType;

  // Mensagens - Tradução
  save_success_message_service_CustomerVehicleBankAccountRegister: string;
  update_success_message_service_CustomerVehicleBankAccountRegister: string;
  delete_success_message_service_CustomerVehicleBankAccountRegister: string;
}

interface PIXType {
  name: string;
  code: string;
}