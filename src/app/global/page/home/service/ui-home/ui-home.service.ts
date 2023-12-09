import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UiHomeService {

  private divHomeVisibleSource = new BehaviorSubject<boolean>(true);
  divHomeVisible$ = this.divHomeVisibleSource.asObservable();

  updateDivVisibility(visible: boolean) {
    this.divHomeVisibleSource.next(visible);
  }
}