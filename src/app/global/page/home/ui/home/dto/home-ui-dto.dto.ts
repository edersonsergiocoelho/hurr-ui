import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";
import { Menu } from "src/app/page/admin/menu/entity/menu.entity";
import { File } from "src/app/page/file/entity/file.entity";

export class HomeUIDTO extends TranslateSeverityDTO {

  currentUser: any;

  menuHeaders: Menu[] = [];
  menuHeaderIcons: Menu[] = [];
  menuHeaderDropdowns: Menu[] = [];

  menuHeaderDropDownShowMenu: boolean;

  breadcrumbs: Array<{ name: string, url: string }> = [];
  selectedBreadcrumb: any;

  file: File;
  dataURI: any;

  label_loading_Generic: string;
}