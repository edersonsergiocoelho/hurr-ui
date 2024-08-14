import { Menu } from "src/app/page/admin/menu/entity/menu.entity";
import { File } from "src/app/page/file/entity/file.entity";

export class HomeUIDTO {

  menuHeaders: Menu[] = [];
  menuHeaderIcons: Menu[] = [];
  menuHeaderDropdowns: Menu[] = [];

  menuHeaderDropDownShowMenu: boolean;

  file: File;
  dataURI: any;

  // Message
  error_message_service_Generic: string;
}