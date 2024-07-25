export class CustomerVehicleEditPhotosUIDTO {
  
  // FileUpload
  uploadedFiles: any;

  // Galleria
  displayCustom: boolean;
  activeIndex: number = 0;
  selectedCoverImage: any;

  customerVehicleFilePhotos: Array<any>;

  // Messages
  error_message_service_Generic: string;
  warn_message_service_Generic: string;

  success_message_service_Generic: string;
  save_success_message_service_CustomerVehicleEditPhotos: string;
}