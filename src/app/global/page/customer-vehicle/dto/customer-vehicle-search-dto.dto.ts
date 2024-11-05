export class CustomerVehicleSearchDTO {

  customerId?: string;

  reservationStartDate: Date;
  reservationStartTime: string;
  reservationEndDate: Date;
  reservationEndTime: string;

  vehicleId?: string;
  vehicleModelId?: string;
  vehicleCategoryId: string;
  vehicleColorId?: string;
  vehicleFuelTypeId?: string;
  vehicleTransmissionId?: string;

  countryName?: string;
  stateName?: string;
  cityName?: string;
}