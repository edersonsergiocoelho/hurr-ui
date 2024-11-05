import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { BankDTO } from "../../admin/bank/dto/bank-dto.dto";
import { CustomerVehicleBankAccount } from "../entity/customer-vehicle-bank-account.entity";

export class CustomerVehicleBankAccountDTO {
  
  customerVehicleBankAccountId: string;
  customer: Customer;
  bank: BankDTO;
  pixType: string;
  pixKey: string;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toEntity(customerVehicleBankAccountDTO: CustomerVehicleBankAccountDTO): CustomerVehicleBankAccount {
    return {
      customerVehicleBankAccountId: customerVehicleBankAccountDTO.customerVehicleBankAccountId,
      customer: customerVehicleBankAccountDTO.customer,
      bank: customerVehicleBankAccountDTO.bank,
      pixType: customerVehicleBankAccountDTO.pixType,
      pixKey: customerVehicleBankAccountDTO.pixKey,
      createdDate: customerVehicleBankAccountDTO.createdDate,
      modifiedDate: customerVehicleBankAccountDTO.modifiedDate,
      enabled: customerVehicleBankAccountDTO.enabled,
    };
  }
}