import { CustomerVehicleBookingSearchDTO } from "src/app/global/page/customer-vehicle-booking/dto/customer-vehicle-booking-search-dto.dto";

export class EarningsResumeUIDTO {

  totalEarnings: number;
  withdrawableCurrentBalance: number;
  withdrawableBalance: number;

  customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO;

  // Messages
  error_message_service_Generic: string;
}