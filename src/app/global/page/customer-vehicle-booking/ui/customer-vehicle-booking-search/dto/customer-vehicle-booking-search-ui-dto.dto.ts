import { SelectItem } from "primeng/api";
import { CustomerVehicleBookingSearchDTO } from "../../../dto/customer-vehicle-booking-search-dto.dto";
import { CustomerVehicleReview } from "src/app/global/page/customer-vehicle-review/entity/customer-vehicle-review.entity";
import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";

export class CustomerVehicleBookingSearchUIDTO extends TranslateConfirmServiceDTO {

  columns: any[] = [];
  totalRecords = 0;

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO;
  customerVehicleBookings: Array<any>;

  selectedCustomerVehicleBooking: CustomerVehicleBooking;
  selectedCustomerVehicleReview: CustomerVehicleReview;

  // Messages - Translate
  label_created_date_option_1_CustomerVehicleBookingSearch: string;
  label_created_date_option_2_CustomerVehicleBookingSearch: string;

  save_summary_message_service_Generic: string;
  save_cancel_booking_message_service_CustomerVehicleBookingSearch: string;
  save_success_write_a_review_message_service_CustomerVehicleBookingSearch: string;
}