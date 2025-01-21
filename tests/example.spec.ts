import {expect, test} from '@playwright/test'
import exp from 'constants';


//Navigating to the websit


test.beforeEach('initial setup',async ({page})=>{
    await page.goto('https://www.booking.com/');
    
    //Validating landing url
    console.log('1)-----Verifying if the URL is correct and we have navigated to the site------')
    await expect(page).toHaveURL('https://www.booking.com')
    const close_button = page.getByLabel('Dismiss sign-in info.');
    await close_button.click();
})

test('Initial date setup',async({page})=>{
    
    // page.waitForSelector(close_button);
    //finding out tomorrow's date for booking
    let date = new Date();
    date.setDate(date.getDate()+1);

    const months_array = ['January','February','Match','April','May','June','July','August','September','October','November','December'];
    const days_array = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    const curr_month = months_array[date.getMonth()];
    let todays_day = date.getDate();
    let my_selected_date = `${todays_day.toString()} ${curr_month.toString()} ${date.getFullYear()}`


    await page.getByTestId('date-display-field-start').click();
    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel(my_selected_date).click();

    todays_day = date.getDate()+1;
    my_selected_date = `${todays_day.toString()} ${curr_month.toString()} ${date.getFullYear()}`
    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel(my_selected_date).click();
    console.log(`Today's date will booking --- ` , todays_day);

    const enteredStartDate = await (page.getByTestId('date-display-field-start').locator('span').textContent())
    const enteredEndDate = await (page.getByTestId('date-display-field-end').locator('span').textContent())
    console.log(enteredStartDate,enteredEndDate);
    expect(enteredEndDate).toContain(todays_day.toString());
    todays_day = todays_day-1;
    console.log(todays_day);
    expect(enteredStartDate).toContain(todays_day.toString());
    // expect(my_str).toBe('')

})

