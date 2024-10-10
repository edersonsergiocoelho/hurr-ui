import { SelectItem } from "primeng/api";
import { CustomerVehicle } from "../../../entity/customer-vehicle.entity";
import { CustomerVehicleSearchDTO } from "../../../dto/customer-vehicle-search-dto.dto";

export class CustomerVehicleSearchUIDTO {

  totalRecords = 0;

  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicles: Array<any>;

  // DTO's
  customerVehicleSearchDTO: CustomerVehicleSearchDTO;

  // Messages
  error_message_service_Generic: string;

  label_created_date_option_1_CustomerVehicleSearch: string;
  label_created_date_option_2_CustomerVehicleSearch: string;
}