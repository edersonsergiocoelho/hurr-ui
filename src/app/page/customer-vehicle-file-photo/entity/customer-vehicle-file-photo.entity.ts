export class CustomerVehicleFilePhoto {
  
  /**
   * Identificador único da foto do veículo do cliente.
   */
  customerVehicleFilePhotoId: string;

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
  dataAsByteArray: string;

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

  constructor(init?: Partial<CustomerVehicleFilePhoto>) {
    Object.assign(this, init);
  }
}