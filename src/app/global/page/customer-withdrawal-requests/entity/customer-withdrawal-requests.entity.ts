export class CustomerWithdrawalRequests {
  /**
   * Identificador único do pedido de retirada.
   */
  customerWithdrawalRequestsId: string;

  /**
   * Identificador da reserva do veículo do cliente.
   */
  customerVehicleBookingId: string;

  /**
   * Identificador do método de pagamento usado para a retirada.
   */
  paymentMethodId: string;

  /**
   * Identificador do status do pagamento.
   */
  paymentStatusId: string;

  /**
   * Apelido ou descrição do pedido de retirada.
   */
  nickname: string;

  /**
   * Data e hora da retirada.
   */
  withdrawalDate: string;

  /**
   * Data e hora de criação do registro.
   */
  createdDate: string;

  /**
   * Data e hora da última modificação do registro.
   */
  modifiedDate?: string;

  /**
   * Indica se o pedido de retirada está ativo.
   */
  enabled: boolean;
}