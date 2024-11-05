import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";
import { Customer } from "src/app/global/page/customer/entity/customer.entity";

export class CheckOutMPUIDTO {

    customer: Customer;
    customerVehicle: CustomerVehicle;

    // State
    customerVehicleId: string;
    dateInit: Date;
    dateEnd: Date;
    selectedHourInit?: string = '10:00';
    selectedHourEnd?: string = '10:00';

    // Messages - Translate
    error_summary_message_service_Generic: string;
    warn_summary_message_service_Generic: string;
    select_customer_address_Address_CheckOut: string;
}