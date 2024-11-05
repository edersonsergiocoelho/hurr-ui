import { Customer } from "src/app/global/page/customer/entity/customer.entity";
import { Bank } from "../../admin/bank/entity/bank.entity";
import { CustomerVehicleBankAccountDTO } from "../dto/customer-vehicle-bank-account-dto.dto";

export class CustomerVehicleBankAccount {
  
  customerVehicleBankAccountId: string;
  customer: Customer;
  bank: Bank;
  pixType: string;
  pixKey: string;
  createdDate: Date;
  modifiedDate?: Date;
  enabled: boolean;

  public static toDTO(customerVehicleBankAccount: CustomerVehicleBankAccount): CustomerVehicleBankAccountDTO {
    return {
      customerVehicleBankAccountId: customerVehicleBankAccount.customerVehicleBankAccountId,
      customer: customerVehicleBankAccount.customer,
      bank: customerVehicleBankAccount.bank,
      pixType: customerVehicleBankAccount.pixType,
      pixKey: customerVehicleBankAccount.pixKey,
      createdDate: customerVehicleBankAccount.createdDate,
      modifiedDate: customerVehicleBankAccount.modifiedDate,
      enabled: customerVehicleBankAccount.enabled,
    };
  }
}