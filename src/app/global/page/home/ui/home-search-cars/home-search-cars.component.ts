import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HomeSearchCarsUIDTO } from './dto/home-search-cars-ui.dto';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-home-search-cars',
  templateUrl: './home-search-cars.component.html',
  styleUrls: ['./home-search-cars.component.css']
})
export class HomeSearchCarsComponent implements OnInit {

  homeSearchCarsUIDTO: HomeSearchCarsUIDTO;

  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(
    private messageService: MessageService,
    private ngZone: NgZone,
    private ngxSpinnerService: NgxSpinnerService,
    private router: Router,
    private translateService: TranslateService,
  ) { }

  ngOnInit() {
    this.translateService.setDefaultLang('pt_BR');
    this.initAutocomplete();
    this.resetSearchForm();
  }

  initAutocomplete() {
    const autocompleteGoogle = new google.maps.places.Autocomplete(this.searchInput.nativeElement);
    autocompleteGoogle.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.homeSearchCarsUIDTO.place = autocompleteGoogle.getPlace();
      });
    });
  }

  resetSearchForm() {
    
    this.homeSearchCarsUIDTO = new HomeSearchCarsUIDTO();
    this.homeSearchCarsUIDTO.today = moment().toDate();

    this.homeSearchCarsUIDTO.dateInit = moment(this.homeSearchCarsUIDTO.today).toDate();
    this.homeSearchCarsUIDTO.dateEnd = moment(this.homeSearchCarsUIDTO.today).add(2, 'days').toDate();
  }

  async asyncCallFunctions() {

    this.ngxSpinnerService.show();

    try {

      const keys = [
        'warn_message_service_Generic',
        'warn_error_getting_current_location_HomeSearchCars',
        'warn_error_accessing_geolocation_HomeSearchCars',
        'warn_geolocation_not_supported_by_the_browser_HomeSearchCars'
      ];

      const translations = await firstValueFrom(this.translateService.get(keys).pipe(first()));

      this.homeSearchCarsUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.homeSearchCarsUIDTO.warn_error_getting_current_location_HomeSearchCars = translations['warn_error_getting_current_location_HomeSearchCars'];
      this.homeSearchCarsUIDTO.warn_error_accessing_geolocation_HomeSearchCars = translations['warn_error_accessing_geolocation_HomeSearchCars'];
      this.homeSearchCarsUIDTO.warn_geolocation_not_supported_by_the_browser_HomeSearchCars = translations['warn_geolocation_not_supported_by_the_browser_HomeSearchCars'];

    } catch (error: any) {
      this.messageService.add({
        severity: 'error',
        summary: '' + this.homeSearchCarsUIDTO.warn_error_getting_current_location_HomeSearchCars,
        detail: error.toString()
      });
    }

    this.ngxSpinnerService.hide();
  }

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;
        
        const geocoder = new google.maps.Geocoder();
        const latlng = { lat, lng };

        geocoder.geocode({ location: latlng }, (results, status) => {
          if (status === 'OK' && results && results.length > 0) {
            this.homeSearchCarsUIDTO.place = results[0];

            this.navigateToSearchCarsDetail();
            
          } else {
            
            this.messageService.add({ 
              severity: 'warn', 
              summary: '' + this.homeSearchCarsUIDTO.warn_message_service_Generic, 
              detail: '' + this.homeSearchCarsUIDTO.warn_error_getting_current_location_HomeSearchCars 
            });

          }
        });
      }, () => {

        this.messageService.add({ 
          severity: 'warn', 
          summary: '' + this.homeSearchCarsUIDTO.warn_message_service_Generic, 
          detail: '' + this.homeSearchCarsUIDTO.warn_error_accessing_geolocation_HomeSearchCars 
        });

      });
    } else {

      this.messageService.add({ 
        severity: 'warn', 
        summary: '' + this.homeSearchCarsUIDTO.warn_message_service_Generic, 
        detail: '' + this.homeSearchCarsUIDTO.warn_geolocation_not_supported_by_the_browser_HomeSearchCars 
      });

    }
  }

  search() {
    if (!this.homeSearchCarsUIDTO.place) {
      this.getCurrentLocation();
    } else {
      this.navigateToSearchCarsDetail();
    }
  }

  private navigateToSearchCarsDetail() {
    const navigationExtras: NavigationExtras = {
      state: {
        place: JSON.stringify(this.homeSearchCarsUIDTO.place),
        dateInit: this.homeSearchCarsUIDTO.dateInit,
        selectedHourInit: this.homeSearchCarsUIDTO.selectedHourInit,
        dateEnd: this.homeSearchCarsUIDTO.dateEnd,
        selectedHourEnd: this.homeSearchCarsUIDTO.selectedHourEnd,
      }
    };
    this.router.navigate(['search-cars-detail'], navigationExtras);
  }
}