import { TranslateSeverityDTO } from "src/app/core/translate/dto/translate-severity-dto.dto";

export class HomeSearchCarsUIDTO extends TranslateSeverityDTO {
 
  place: any;

  dateInit: Date;
  dateEnd: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';
  
  selectedHourInit: string = '10:00';
  selectedHourEnd: string = '10:00';
  
  hoursInit: string[];
  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  // Messages - Translate
  label_where_HomeSearchCars: string;
  label_from_HomeSearchCars: string;
  label_until_HomeSearchCars: string;

  warn_error_getting_current_location_HomeSearchCars: string;
  warn_error_accessing_geolocation_HomeSearchCars: string;
  warn_geolocation_not_supported_by_the_browser_HomeSearchCars: string;
}