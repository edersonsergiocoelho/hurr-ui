import { TypeMenu } from "../../type-menu/entity/type-menu.entity";

export class MenuDTO {
 
  menuId: string;
  name: string;
  icon?: string;
  menuParent?: MenuDTO;
  url?: string;
  menuOrder?: number;
  typeMenu: TypeMenu;
  subMenus?: MenuDTO[];
}