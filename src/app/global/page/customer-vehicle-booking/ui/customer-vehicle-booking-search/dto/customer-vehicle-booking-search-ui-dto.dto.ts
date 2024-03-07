import { SelectItem } from "primeng/api";
import { CustomerVehicleBooking } from "../../../entity/customer-vehicle-booking.entity";

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

  customerVehicleBookingSearchDTO: CustomerVehicleBookingSearchUIDTO;
  products: Array<CustomerVehicleBooking>;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;

  label_created_date_option_1_CustomerVehicleBookingSearch: string;
  label_created_date_option_2_CustomerVehicleBookingSearch: string;
}