import { Component, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { HomeUIService } from '../../service/home-ui/home-ui.service';
import { HomeSearchCarsUIDTO } from './dto/home-search-cars-ui.dto';

@Component({
  selector: 'app-home-search-cars',
  templateUrl: './home-search-cars.component.html',
  styleUrls: ['./home-search-cars.component.css']
})
export class HomeSearchCarsComponent implements OnInit {

  homeSearchCarsUIDTO: HomeSearchCarsUIDTO;

  @Input() divHomeVisible: boolean = true;
  @Output() divHomeVisibleChange = new EventEmitter<boolean>();
  @ViewChild('searchInput', { static: true }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private activatedRoute: ActivatedRoute,
              private ngZone: NgZone,
              private router: Router,
              private homeUIService: HomeUIService) { }

  ngOnInit() {

    debugger;

    this.resetRegisterForm();

    const autocompleteGoogle = new google.maps.places.Autocomplete(this.searchInput.nativeElement);

    autocompleteGoogle.addListener('place_changed', () => {
      this.ngZone.run(() => {
        this.homeSearchCarsUIDTO.place = autocompleteGoogle.getPlace();
      });
    });
  }

  resetRegisterForm () {

    this.homeSearchCarsUIDTO = new HomeSearchCarsUIDTO();
    this.homeSearchCarsUIDTO.today = new Date();
    this.homeSearchCarsUIDTO.dateInit = new Date(this.homeSearchCarsUIDTO.today);
    this.homeSearchCarsUIDTO.dateEnd = new Date(this.homeSearchCarsUIDTO.today);
  
    this.homeSearchCarsUIDTO.dateEnd.setDate(this.homeSearchCarsUIDTO.dateEnd.getDate() + 2);
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

            this.homeUIService.updateDivVisibility(false);

            const navigationExtras: NavigationExtras = {
              state: {
                place: JSON.stringify(results[0]),
                dateInit: this.homeSearchCarsUIDTO.dateInit,
                selectedHourInit: this.homeSearchCarsUIDTO.selectedHourInit,
                dateEnd: this.homeSearchCarsUIDTO.dateEnd,
                selectedHourEnd: this.homeSearchCarsUIDTO.selectedHourEnd,
              }
            };

            this.router.navigate(['search-cars-detail'], navigationExtras);
          } else {
            console.error('Erro ao obter o local atual.');
          }
        });
      }, () => {
        console.error('Erro ao acessar a geolocalização.');
      });
    } else {
      console.error('Geolocalização não suportada pelo navegador.');
    }
  }

  search () {

    if (this.homeSearchCarsUIDTO.place == null) {
      this.getCurrentLocation();
    } else {

      this.homeUIService.updateDivVisibility(false);

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
}