export class CustomerVehicleFileInsuranceDTO {
  
  /**
   * Identificador único do documento de seguro do veículo do cliente.
   */
  customerVehicleFileInsuranceId: string;

  /**
   * Identificador único do veículo do cliente associado.
   */
  customerVehicleId: string;

  /**
   * Tipo de conteúdo do arquivo (MIME type).
   */
  contentType: string;

  /**
   * Nome original do arquivo.
   */
  originalFileName: string;

  /**
   * Dados do arquivo em formato de array de bytes.
   */
  dataAsByteArray: Uint8Array;

  /**
   * Data de criação do registro.
   */
  createdDate: string;

  /**
   * Data de modificação do registro.
   */
  modifiedDate?: string;

  /**
   * Indicador de ativação do registro.
   */
  enabled: boolean;

  constructor(init?: Partial<CustomerVehicleFileInsuranceDTO>) {
    Object.assign(this, init);
  }
}