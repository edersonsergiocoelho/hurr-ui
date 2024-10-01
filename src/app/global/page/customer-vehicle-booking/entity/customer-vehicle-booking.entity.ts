import { CustomerAddress } from "../../customer-address/entity/customer-address.entity";
import { CustomerVehicle } from "../../customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "../../customer/entity/customer.entity";

export class CustomerVehicleBooking {
  
  customerVehicleBookingId: string; // UUID em Java, string em TS
  customerVehicle: CustomerVehicle; // Entidade CustomerVehicle
  customer: Customer; // Entidade Customer
  customerAddressBilling?: CustomerAddress; // Endereço de cobrança do cliente
  customerAddressDelivery?: CustomerAddress; // Endereço de entrega do cliente
  customerAddressDeliveryValue?: number; // Custo do endereço de entrega
  customerAddressPickUp?: CustomerAddress; // Endereço de retirada do cliente
  customerAddressPickUpValue?: number; // Custo do endereço de retirada
  booking: string; // Referência única da reserva
  reservationStartDate: Date; // Data de início da reserva
  reservationStartTime: string; // Hora de início da reserva
  reservationEndDate: Date; // Data de término da reserva
  reservationEndTime: string; // Hora de término da reserva
  bookingStartKM: number; // Leitura do KM inicial
  bookingEndKM: number; // Leitura do KM final
  bookingStartDate?: Date; // Data e hora de início da reserva
  bookingEndDate?: Date; // Data e hora de término da reserva
  bookingCancellationDate?: Date; // Data e hora de cancelamento da reserva
  withdrawableBookingValue: number; // Valor disponível para retirada
  totalBookingValue: number; // Valor total da reserva
  mercadoPagoPaymentId: number; // Identificador do pagamento
  mercadoPagoPaymentData?: any; // Dados de pagamento em JSON (equivalente ao campo JSONB em Java)
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;
}