import { Customer } from "../../customer/entity/customer.entity";
import { CustomerVehicleBooking } from "../../customer-vehicle-booking/entity/customer-vehicle-booking.entity";
import { PaymentMethod } from "src/app/page/admin/payment-method/entity/payment-method.entity";
import { PaymentStatus } from "src/app/page/admin/payment-status/entity/payment-status.entity";
import { CustomerBankAccount } from "src/app/page/customer-bank-account/entity/customer-bank-account.entity";

export class CustomerWithdrawalRequest {

  /**
   * Identificador único do pedido de retirada.
   */
  customerWithdrawalRequestId: string;

  /**
   * Identificador do cliente.
   */
  customer: Customer;

  /**
   * Identificador da reserva do veículo do cliente.
   */
  customerVehicleBooking: CustomerVehicleBooking;

  customerBankAccount: CustomerBankAccount;

  /**
   * Identificador do método de pagamento usado para a retirada.
   */
  paymentMethod: PaymentMethod;

  /**
   * Identificador do status do pagamento.
   */
  paymentStatus: PaymentStatus;

  /**
   * Data e hora da retirada.
   */
  withdrawalDate: string;

  /**
   * Data e hora de criação do registro.
   */
  createdDate: string;

  /**
   * Data e hora da última modificação do registro.
   */
  modifiedDate?: string;

  /**
   * Indica se o pedido de retirada está ativo.
   */
  enabled: boolean;
}