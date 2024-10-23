import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { VehicleBrandSearchDTO } from "../../../dto/vehicle-brand-search-dto.dto";
import { VehicleBrand } from "../../../entity/vehicle-brand.entity";

export class VehicleBrandSearchUIDTO extends TranslateConfirmServiceDTO {
  
  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  globalFilter: string | undefined;

  vehicleBrandSearchDTO: VehicleBrandSearchDTO;
  vehicleBrands: Array<VehicleBrand>;
  selectedVehicleBrand: Array<VehicleBrand>;

  enabledOptions: any[];
  enabledValue: string = 'ALL';

  // Mensagens - Tradução
  table_header_vehicle_brand_id_VehicleBrandSearch: string;
  table_header_vehicle_brand_name_VehicleBrandSearch: string;
  table_header_enabled_VehicleBrandSearch: string;
}