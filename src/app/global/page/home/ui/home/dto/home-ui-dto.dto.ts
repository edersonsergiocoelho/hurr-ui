import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { CustomerVehicle } from "src/app/global/page/customer-vehicle/entity/customer-vehicle.entity";
import { Menu } from "src/app/page/admin/menu/entity/menu.entity";
import { CustomerVehicleFilePhoto } from "src/app/page/customer-vehicle-file-photo/entity/customer-vehicle-file-photo.entity";
import { File } from "src/app/page/file/entity/file.entity";

export class HomeUIDTO extends TranslateSeverityDTO {

  currentUser: any;
  customerVehicle: CustomerVehicle;
  customerVehicleFilePhoto: any;

  menuHeaders: Menu[] = [];
  menuHeaderIcons: Menu[] = [];
  menuHeaderDropdowns: Menu[] = [];
  menuSideCustomerVehicleEdits: Menu[] = [];

  menuHeaderDropDownShowMenu: boolean;

  breadcrumbs: Array<{ name: string, url: string }> = [];
  selectedBreadcrumb: any;

  file: File;
  dataURI: any;

  // Mensagens - Tradução
  label_loading_Generic: string;
}