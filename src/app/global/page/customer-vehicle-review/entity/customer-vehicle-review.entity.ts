export interface CustomerVehicleReview {

  customerVehicleReviewId: string;
  customerVehicleId: string;
  customerId: string;
  review: string;
  rating: number;
  createdDate: string;
  modifiedDate?: string;
  enabled: boolean;
}