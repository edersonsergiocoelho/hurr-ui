import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";

export class CustomerVehicleBookingViewInvoiceUIDTO extends TranslateSeverityDTO {

  // Parâmetros Da URL
  collectionId: string | null = null;
  collectionStatus: string | null = null;
  paymentId: number;
  status: string | null = null;
  externalReference: string | null = null;
  paymentType: string | null = null;
  merchantOrderId: string | null = null;
  preferenceId: string | null = null;
  siteId: string | null = null;
  processingMode: string | null = null;
  merchantAccountId: string | null = null;

  // 
  days: any;
  
  customerVehicleBooking: any;
}