import { TypeMenu } from "../../type-menu/entity/type-menu.entity";

export class Menu {
 
  menuId: string;
  name: string;
  icon?: string;
  menuParent?: Menu;
  url?: string;
  menuOrder?: number;
  typeMenu: TypeMenu;
  subMenus?: Menu[];
  showSubMenu: boolean;
}