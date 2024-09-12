
import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerAddress } from "src/app/global/page/customer-address/entity/customer-address.entity";
import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";

export class CheckoutUIDTO extends TranslateSeverityDTO {

  customer: Customer;
  customerVehicle: any;

  customerAddressDeliverys: Array<CustomerAddress>;
  selectedCustomerAddressDelivery: CustomerAddress | null;

  customersAddressPickups: Array<CustomerAddress>;
  selectedCustomerAddressPickUp: CustomerAddress | null;

  customersAddresses: Array<CustomerAddress>;
  selectedCustomerAddress: CustomerAddress | null;

  //
  days: number;
  //dailyRateFormat: string;
  deliveryCost: number | null;
  //deliveryCostFormat: string | null;
  pickUpCost: number | null;
  //pickUpCostFormat: string | null;
  totalBookingValue: number;
  //totalBookingValueFormat: string;

  // State
  customerVehicleId: string;
  dateInit: Date;
  dateEnd: Date;
  dateCancelFree: Date;
  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  // Messages
  header_Address_Checkout: string;
}