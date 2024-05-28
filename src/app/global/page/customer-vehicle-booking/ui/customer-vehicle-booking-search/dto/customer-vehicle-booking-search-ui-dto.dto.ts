import { SelectItem } from "primeng/api";
import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";
import { CustomerVehicleBookingSearchDTO } from "../../../dto/customer-vehicle-booking-search-dto.dto";
import { CustomerVehicleReview } from "src/app/global/page/customer-vehicle-review/entity/customer-vehicle-review.entity";

export class CustomerVehicleBookingSearchUIDTO {

  columns: any[] = [];
  totalRecords = 0;
  loading = true;

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchDTO;
  customerVehicleBookings: Array<CustomerVehicleBooking>;

  customerVehicleReview: CustomerVehicleReview;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;

  label_created_date_option_1_CustomerVehicleBookingSearch: string;
  label_created_date_option_2_CustomerVehicleBookingSearch: string;

  save_message_service_Generic: string;
  save_success_write_a_review_message_service_CustomerVehicleBookingSearch: string;
}