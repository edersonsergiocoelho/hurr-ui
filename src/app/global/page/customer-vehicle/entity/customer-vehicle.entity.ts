import { Customer } from "../../customer/entity/customer.entity";
import { Vehicle } from "src/app/page/admin/vehicle/entity/vehicle.entity";
import { VehicleModel } from "src/app/page/admin/vehicle-model/entity/vehicle-model.entity";
import { VehicleColor } from "src/app/page/admin/vehicle-color/entity/vehicle-color.entity";
import { VehicleFuelType } from "src/app/page/admin/vehicle-fuel-type/entity/vehicle-fuel.type.entity";
import { VehicleTransmission } from "src/app/page/admin/vehicle-transmission/entity/vehicle-transmission.entity";
import { CustomerVehicleAddress } from "../../customer-vehicle-address/entity/customer-vehicle-address.entity";

export class CustomerVehicle {
  
  customerVehicleId: string;
  customer: Customer;
  vehicle: Vehicle;
  vehicleModel: VehicleModel;
  vehicleColor: VehicleColor;
  vehicleFuelType: VehicleFuelType;
  vehicleTransmission: VehicleTransmission;
  addresses: Array<CustomerVehicleAddress>;
  description: string;
  licensePlate: string;
  renavam: string;
  chassis: string;
  yearOfManufacture: number;
  yearOfTheCar: number;
  dailyRate: number;
  cleaningFee: number;
  unlimitedMileage: boolean;
  limitedMileage: boolean;
  limitedMileageIncluded: number;
  limitedMileageValue: number;
  deliverToAddress: boolean;
  mileageFeeDelivery: number;
  pickUpAtAddress: boolean;
  mileageFeePickUp: number;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;
}