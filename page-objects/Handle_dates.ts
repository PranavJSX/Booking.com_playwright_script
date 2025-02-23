
export class Handle_dates{
    date_handler(howmanydaysforward:number){
          let date = new Date();
            date.setDate(date.getDate()+1);
        
            const months_array = ['January','February','Match','April','May','June','July','August','September','October','November','December'];
            const days_array = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
            let current_day_of_the_week_string = days_array[date.getDay()-1+howmanydaysforward];
            let curr_month = months_array[date.getMonth()];
            let todays_day = date.getDate();
            let my_selected_date = `${todays_day.toString()} ${curr_month.toString()} ${date.getFullYear()}`
            return my_selected_date

    }
}