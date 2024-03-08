import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";

export class CheckoutMercadoPagoUIDTO {

    customerVehicle: CustomerVehicle;

    totalBookingValue: number;

    // State
    customerVehicleId: string;
    dateInit: Date;
    dateEnd: Date;
    selectedHourInit?: string = '10:00';
    selectedHourEnd?: string = '10:00';

    // Messages
    error_message_service_Generic: string;
    warn_message_service_Generic: string;
    select_customer_address_Address_Checkout: string;
}