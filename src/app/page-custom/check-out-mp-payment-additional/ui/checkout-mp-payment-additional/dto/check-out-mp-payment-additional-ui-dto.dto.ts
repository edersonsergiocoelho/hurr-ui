import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerVehicleBooking } from "src/app/global/page/customer-vehicle-booking/entity/customer-vehicle-booking.entity";

export class CheckOutMPPaymentAdditionalUIDTO extends TranslateSeverityDTO {

    customerVehicleBooking: CustomerVehicleBooking;
}