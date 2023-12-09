import { Component, ElementRef, EventEmitter, Input, NgZone, Output, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { UiHomeService } from '../../service/ui-home/ui-home.service';

declare const google: any;

@Component({
  selector: 'app-home-search-cars',
  templateUrl: './home-search-cars.component.html',
  styleUrls: ['./home-search-cars.component.css']
})
export class HomeSearchCarsComponent  {

  dateInit: Date;
  dateEnd: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';

  selectedHourInit?: string = '10:00';
  selectedHourEnd?: string = '10:00';

  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  @Input() divHomeVisible: boolean = true;
  @Output() divHomeVisibleChange = new EventEmitter<boolean>();
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private ngZone: NgZone,
              private router: Router,
              private uiHomeService: UiHomeService) {
    this.today = new Date();
    this.dateInit = this.today;
    this.dateEnd = this.today;
  }

  ngOnInit() {
    const autocomplete = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocomplete.addListener('place_changed', () => {
      this.ngZone.run(() => {
        const place = autocomplete.getPlace();
      });
    });
  }

  search () {
    this.uiHomeService.updateDivVisibility(false);
    this.router.navigate(['/home/search-cars-detail']);
  }
  
}