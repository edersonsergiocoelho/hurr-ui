import { User } from "src/app/page/user/entity/user.entity";
import { CustomerVehicleApproved } from "../../../entity/customer-vehicle-approved.entity";
import { CustomerVehicleApprovedSearchDTO } from "../../../dto/customer-vehicle-approved-search-dto.dto";
import { VehicleBrand } from "src/app/page/admin/vehicle-brand/entity/vehicle-brand.entity";
import { Vehicle } from "src/app/page/admin/vehicle/entity/vehicle.entity";
import { VehicleModel } from "src/app/page/admin/vehicle-model/entity/vehicle-model.entity";

export class CustomerVehicleApprovedSearchUIDTO {

  columns: any[] = [];
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  customerVehicleApprovedSearchDTO: CustomerVehicleApprovedSearchDTO;
  customerVehicleApproveds: Array<CustomerVehicleApproved>;

  vehicleBrands: Array<VehicleBrand>;
  selectedVehicleBrand: VehicleBrand;

  vehicles: Array<Vehicle>;
  selectedVehicle: Vehicle;

  vehicleModels: Array<VehicleModel>;
  selectedVehicleModel: VehicleModel;

  // Message
  error_message_service_Generic: string;
  warn_message_service_Generic: string;
  table_header_customer_vehicle_approved_id_CustomerVehicleApprovedSearch: string;
  table_header_vehicle_brand_CustomerVehicleApprovedSearch: string;
  table_header_vehicle_CustomerVehicleApprovedSearch: string;
  table_header_vehicle_model_CustomerVehicleApprovedSearch: string;
  table_header_first_name_CustomerVehicleApprovedSearch: string;
  table_header_last_name_CustomerVehicleApprovedSearch: string;
  table_header_cpf_CustomerVehicleApprovedSearch: string;
  table_header_created_date_CustomerVehicleApprovedSearch: string;
  table_header_enabled_CustomerVehicleApprovedSearch: string;
  table_header_action_CustomerVehicleApprovedSearch: string;
}