
import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerAddress } from "src/app/global/page/customer-address/entity/customer-address.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";

export class CheckOutUIDTO extends TranslateSeverityDTO {

  customer: Customer;
  customerVehicle: any;

  customerAddressDeliverys: Array<CustomerAddress>;
  selectedCustomerAddressDelivery: CustomerAddress | null;

  customersAddressPickups: Array<CustomerAddress>;
  selectedCustomerAddressPickUp: CustomerAddress | null;

  customersAddressesBilling: Array<CustomerAddress>;
  selectedCustomerAddressBilling: CustomerAddress | null;

  //
  daysReservation: number;
  deliveryCost: number | null;
  pickUpCost: number | null;
  totalBookingValue: number;

  // State
  customerVehicleId: string;
  dateInit: Date;
  dateEnd: Date;
  dateCancelFree: Date;
  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  // Messages - Translate
  header_Address_CheckOut: string;
}