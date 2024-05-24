
import { CustomerAddress } from "src/app/global/page/customer-address/entity/customer-address.entity";
import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";

export class CheckoutUIDTO {

  customer: Customer;
  customerVehicle: CustomerVehicle;

  customerAddressDeliverys: Array<CustomerAddress>;
  selectCustomerAddressDelivery: CustomerAddress | null;

  customersAddressPickups: Array<CustomerAddress>;
  selectCustomerAddressPickUp: CustomerAddress | null;

  customersAddresses: Array<CustomerAddress>;
  selectCustomerAddress: CustomerAddress | null;

  //
  days: number;
  dailyRateFormat: string;
  deliveryCost: number | null;
  deliveryCostFormat: string | null;
  pickUpCost: number | null;
  pickUpCostFormat: string | null;
  totalBookingValue: number;
  totalBookingValueFormat: string;

  // State
  customerVehicleId: string;
  dateInit: Date;
  dateEnd: Date;
  dateCancelFree: Date;
  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  // Messages
  error_message_service_Generic: string;
  header_Address_Checkout: string;
}