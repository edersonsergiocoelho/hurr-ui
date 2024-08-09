import { Menu } from "src/app/page/admin/menu/entity/menu.entity";
import { File } from "src/app/page/file/entity/file.entity";

export class HomeUIDTO {

  menusHeader: Menu[] = [];

  file: File;
  dataURI: any;

  // Message
  error_message_service_Generic: string;
}