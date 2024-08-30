import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeUIService {

  private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();

  constructor() { }

  setCurrentUser(user: any): void {
    this.currentUserSubject.next(user);
  }

  getCurrentUser(): any {
    return this.currentUserSubject.value;
  }

  private customerVehicleIdSubject = new BehaviorSubject<string | null>(null);
  customerVehicleId$ = this.customerVehicleIdSubject.asObservable();

  setCustomerVehicleId(id: string | null): void {
    this.customerVehicleIdSubject.next(id);
  }

  getCustomerVehicleId(): any {
    return this.customerVehicleIdSubject.value;
  }
}