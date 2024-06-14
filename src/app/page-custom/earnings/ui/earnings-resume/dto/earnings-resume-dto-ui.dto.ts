import { CustomerVehicleBookingSearchDTO } from "src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto";
import { CustomerWithdrawalRequest } from "src/app/global/page/customer-withdrawal-request/entity/customer-withdrawal-request.entity";
import { PaymentMethod } from "src/app/page/admin/payment-method/entity/payment-method.entity";
import { CustomerBankAccount } from "src/app/page/customer-bank-account/entity/customer-bank-account.entity";

export class EarningsResumeUIDTO {

  visibleDialog: boolean = false;
  stepDialog: number = 1;

  totalEarnings: number;
  withdrawableCurrentBalance: number;
  withdrawableBalance: number;

  paymentMethods: Array<PaymentMethod>;
  selectedPaymentMethod: string;
  customerBankAccounts: Array<CustomerBankAccount>;
  selectedCustomerBankAccount: string;

  // DTO's
  customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO;

  // Messages
  error_message_service_Generic: string;
}