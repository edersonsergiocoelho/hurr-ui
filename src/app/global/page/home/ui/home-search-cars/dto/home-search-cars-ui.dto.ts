export class HomeSearchCarsUIDTO {
 
  dateInit: Date;
  dateEnd: Date;
  today: Date;
  dateFormat = 'dd/mm/yy';
  selectedHourInit: string = '10:00';
  selectedHourEnd: string = '10:00';

  hours: string[] = Array.from({ length: 48 }, (_, index) => {
    const hour = Math.floor(index / 2);
    const minute = index % 2 === 0 ? '00' : '30';
    return `${hour.toString().padStart(2, '0')}:${minute}`;
  });

  place: any;
}