import { Component, ElementRef, NgZone, ViewChild } from '@angular/core';

declare const google: any;

@Component({
  selector: 'app-home-search-cars',
  templateUrl: './home-search-cars.component.html',
  styleUrls: ['./home-search-cars.component.css']
})
export class HomeSearchCarsComponent {

  dateInit: Date;
  dateEnd: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';

  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  constructor(private ngZone: NgZone) {
    this.today = new Date();
    this.dateInit = this.today;
    this.dateEnd = this.today;
  }

  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
      });
    });
  }
}