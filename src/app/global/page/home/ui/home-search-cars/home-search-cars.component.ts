import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { HomeSearchCarsUIDTO } from './dto/home-search-cars-ui.dto';
import { MessageService } from 'primeng/api';
import { TranslateService } from '@ngx-translate/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { first, firstValueFrom } from 'rxjs';
import * as moment from 'moment';
import { SeverityConstants } from 'src/app/commom/severity.constants';

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

    this.asyncCallFunctions();
  }

  async asyncCallFunctions() {
    this.ngxSpinnerService.show();

    this.updateHoursInit();
  
    try {
      // Array de promessas para carregar as traduções e menus
      const [translations] = await Promise.all([
        this.loadTranslations()
      ]);
  
      // Atribuindo valores após as promessas serem resolvidas
      this.homeSearchCarsUIDTO.warn_message_service_Generic = translations['warn_message_service_Generic'];
      this.homeSearchCarsUIDTO.error_message_service_Generic = translations['error_message_service_Generic'];
      this.homeSearchCarsUIDTO.info_message_service_Generic = translations['info_message_service_Generic'];
      this.homeSearchCarsUIDTO.success_message_service_Generic = translations['success_message_service_Generic'];
      this.homeSearchCarsUIDTO.label_where_HomeSearchCars = translations['label_where_HomeSearchCars'];
      this.homeSearchCarsUIDTO.label_from_HomeSearchCars = translations['label_from_HomeSearchCars'];
      this.homeSearchCarsUIDTO.label_until_HomeSearchCars = translations['label_until_HomeSearchCars'];
      this.homeSearchCarsUIDTO.warn_error_getting_current_location_HomeSearchCars = translations['warn_error_getting_current_location_HomeSearchCars'];
      this.homeSearchCarsUIDTO.warn_error_accessing_geolocation_HomeSearchCars = translations['warn_error_accessing_geolocation_HomeSearchCars'];
      this.homeSearchCarsUIDTO.warn_geolocation_not_supported_by_the_browser_HomeSearchCars = translations['warn_geolocation_not_supported_by_the_browser_HomeSearchCars'];
  
    } catch (error: any) {
      this.messageService.add({
        severity: SeverityConstants.ERROR,
        summary: this.homeSearchCarsUIDTO.error_message_service_Generic,
        detail: error.toString()
      });
    } finally {
      this.ngxSpinnerService.hide();
    }
  }

  private loadTranslations(): Promise<any> {
    const keys = [
      'warn_message_service_Generic',
      'error_message_service_Generic',
      'info_message_service_Generic',
      'success_message_service_Generic',
      'label_where_HomeSearchCars',
      'label_from_HomeSearchCars',
      'label_until_HomeSearchCars',
      'warn_error_getting_current_location_HomeSearchCars',
      'warn_error_accessing_geolocation_HomeSearchCars',
      'warn_geolocation_not_supported_by_the_browser_HomeSearchCars'
    ];
    return firstValueFrom(this.translateService.get(keys).pipe(first()));
  }

  // Method to update hoursInit based on dateInit
  updateHoursInit() {
    const now = new Date();
    const isToday = this.isSameDay(this.homeSearchCarsUIDTO.dateInit, this.homeSearchCarsUIDTO.today);

    // Check if current time is 23:30 or later
    if (now.getHours() === 23 && now.getMinutes() >= 30) {
      this.homeSearchCarsUIDTO.dateInit = new Date();
      this.homeSearchCarsUIDTO.dateInit.setDate(this.homeSearchCarsUIDTO.dateInit.getDate() + 1);
    }

    // Calculate hoursInit based on the updated dateInit
    this.homeSearchCarsUIDTO.hoursInit = Array.from({ length: 48 }, (_, index) => {
      const hour = Math.floor(index / 2);
      const minute: number = index % 2 === 0 ? 0 : 30;
      const hourStr = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;

      // Show all hours if dateInit is tomorrow or later
      if (this.homeSearchCarsUIDTO.dateInit > now || !isToday) {
        return hourStr;
      }

      // Otherwise, show only future hours of today
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();
      if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
        return ''; // For past hours, return an empty string
      } else {
        return hourStr;
      }
    }).filter(hour => hour !== ''); // Filter out empty hours
  }

  // Helper method to check if two dates are the same day
  private isSameDay(date1: Date, date2: Date): boolean {
    return date1.getFullYear() === date2.getFullYear() &&
            date1.getMonth() === date2.getMonth() &&
            date1.getDate() === date2.getDate();
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
      }, 
      (error) => {
        console.error('Error getting geolocation:', error)

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