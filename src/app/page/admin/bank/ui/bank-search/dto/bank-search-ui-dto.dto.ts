import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { BankSearchDTO } from "../../../dto/bank-search-dto.dto";
import { Bank } from "../../../entity/bank.entity";

export class BankSearchUIDTO extends TranslateConfirmServiceDTO {

  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  globalFilter: string | undefined;

  bankSearchDTO: BankSearchDTO;
  bankes: Array<Bank>;
  selectedBank: Array<Bank>;

  enabledOptions: any[];
  enabledValue: string = 'ALL';

  // Mensagens - Tradução
  table_header_bank_id_BankSearch: string;
  table_header_bank_name_BankSearch: string;
  table_header_enabled_BankSearch: string;
}