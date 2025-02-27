
export class Handle_dates{
    date_handler(howmanydaysforward:number){
          let date = new Date();
            const todays_day = date.getDate()+howmanydaysforward;
            return todays_day.toString();

    }
}   