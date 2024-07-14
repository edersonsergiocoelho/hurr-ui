import { CustomerVehicleBookingSearchDTO } from "src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto";
import { CustomerVehicleBooking } from "src/app/global/page/customer-vehicle-booking/entity/customer-vehicle-booking.entity";
import { CustomerWithdrawalRequest } from "src/app/global/page/customer-withdrawal-request/entity/customer-withdrawal-request.entity";
import { PaymentMethod } from "src/app/page/admin/payment-method/entity/payment-method.entity";
import { PaymentStatus } from "src/app/page/admin/payment-status/entity/payment-status.entity";
import { CustomerBankAccount } from "src/app/page/customer-bank-account/entity/customer-bank-account.entity";

export class EarningsResumeUIDTO {

  visibleDialog: boolean = false;
  stepDialog: number = 1;

  totalEarnings: number;
  withdrawableCurrentBalance: number;
  withdrawableBalance: number;


  paymentMethods: Array<PaymentMethod>;
  selectedPaymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  customerBankAccounts: Array<CustomerBankAccount>;
  selectedCustomerBankAccount: CustomerBankAccount;
  customerVehicleBookings: Array<CustomerVehicleBooking>;
  selectedCustomerVehicleBookings: Array<CustomerVehicleBooking>;
  selectAllCustomerVehicleBookings: boolean = false;

  // DTO's
  customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO;

  // Messages
  error_message_service_Generic: string;
}