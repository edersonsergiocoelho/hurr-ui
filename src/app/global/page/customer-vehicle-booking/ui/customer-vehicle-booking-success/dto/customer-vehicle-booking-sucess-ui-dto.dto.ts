import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";

export class CustomerVehicleBookingSuccessUIDTO {

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

  customerVehicleBooking: CustomerVehicleBooking;
  days: any;

  payment: any;
  paymentMetadata: any;

  preference: any;
  preferenceMetadata: any;

  // Messages
  error_message_service_Generic: string;
}