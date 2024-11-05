import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";

export class CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialogUIDTO extends TranslateSeverityDTO {

  customerVehicleBooking: CustomerVehicleBooking;

  limitedMileageTotalKM: number;
  limitedMileageTotalValue: number;

  cleaningFeeOptions: any[] = [{label: 'Sim', value: 'YES'}, {label: 'Não', value: 'NO'}];
  cleaningFeeValue: string = 'NO';


  // Messages - Translate
  check_out_summary_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog: string;
  check_out_detail_message_service_CustomerVehicleBookingCustomerVehicleCheckOutDynamicDialog: string;
}