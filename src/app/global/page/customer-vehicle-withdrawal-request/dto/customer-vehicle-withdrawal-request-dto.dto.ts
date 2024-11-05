import { Customer } from "../../customer/entity/customer.entity";
import { CustomerVehicleBooking } from "../../customer-vehicle-booking/entity/customer-vehicle-booking.entity";
import { PaymentMethod } from "src/app/page/admin/payment-method/entity/payment-method.entity";
import { PaymentStatus } from "src/app/page/admin/payment-status/entity/payment-status.entity";
import { CustomerVehicleBankAccount } from "src/app/page/customer-vehicle-bank-account/entity/customer-vehicle-bank-account.entity";

export class CustomerVehicleWithdrawalRequestDTO {

  customerVehicleWithdrawalRequestId: string;
  customer: Customer;
  customerVehicleBooking: CustomerVehicleBooking;
  customerVehicleBankAccount: CustomerVehicleBankAccount;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  withdrawalDate: string;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;
}