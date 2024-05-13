export class HomeSearchCarsUIDTO {
 
  dateInit: Date;
  dateEnd: Date;
  today: Date;

  dateFormat = 'dd/mm/yy';
  
  selectedHourInit: string = '10:00';
  selectedHourEnd: string = '10:00';

  // Array de horas a partir da hora atual
  hoursInit: string[] = Array.from({ length: 48 }, (_, index) => {
    const currentHour = new Date().getHours();
    const currentMinute = new Date().getMinutes();
    const hour = Math.floor(index / 2);
    const minute: number = index % 2 === 0 ? 0 : 30; // Converter minute para número
    if (hour < currentHour || (hour === currentHour && minute < currentMinute)) {
      return ''; // Para as horas passadas, retornar uma string vazia
    } else {
      return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    }
  }).filter(hour => hour !== ''); // Filtrar as horas vazias

  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  place: any;

  // Messages
  warn_message_service_Generic: string;
  warn_error_getting_current_location_HomeSearchCars: string;
  warn_error_accessing_geolocation_HomeSearchCars: string;
  warn_geolocation_not_supported_by_the_browser_HomeSearchCars: string;
}