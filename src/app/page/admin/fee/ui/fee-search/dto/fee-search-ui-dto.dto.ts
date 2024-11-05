import { TranslateConfirmServiceDTO } from "src/app/core/translate/dto/translate-confirm-service-dto.dto";
import { FeeSearchDTO } from "../../../dto/fe-search-dto.dto";
import { Fee } from "../../../entity/fee.entity";

export class FeeSearchUIDTO extends TranslateConfirmServiceDTO {

  columns: any[] = [];
  dt: any;
  totalRecords = 0;

  page: number = 0;
  size: number = 10;
  sortDir: string = '';
  sortBy: string | string[];

  globalFilter: string | undefined;

  feeSearchDTO: FeeSearchDTO;
  feees: Array<Fee>;
  selectedFee: Array<Fee>;

  feeTypes: FeeType[];
  selectedFeeType: FeeType;

  enabledOptions: any[];
  enabledValue: string = 'ALL';

  // Mensagens - Tradução
  table_header_payment_status_id_FeeSearch: string;
  table_header_payment_status_name_FeeSearch: string;
  table_header_enabled_FeeSearch: string;
}

interface FeeType {
  name: string;
  code: string;
}