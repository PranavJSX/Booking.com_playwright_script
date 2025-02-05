import {expect, test} from '@playwright/test'
import {dismiss_popup_panel} from '../page-objects/handleLayout_dismiss.spec'; 


//Navigating to the websit


test.beforeEach('initial setup',async ({page})=>{
    await page.goto('https://www.booking.com/');
    
    //Validating landing url
    console.log('------TEST START-----')
    console.log('1)-----Verifying if the URL is correct and we have navigated to the site------');
    await expect(page).toHaveURL('https://www.booking.com');
    await page.waitForLoadState();
    const close_popup = new dismiss_popup_panel(page)
    close_popup.close_discount_popup();
})

test('Checking the hotel booking filters',async({page,context})=>{
    
    // page.waitForSelector(close_button);

    //finding out tomorrow's date for booking
    console.log('2)-----Verifying if the date is correctly selected ------')
    let date = new Date();
    date.setDate(date.getDate()+1);

    const months_array = ['January','February','Match','April','May','June','July','August','September','October','November','December'];
    const days_array = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];
    let current_day_of_the_week_string = days_array[date.getDay()-1];
    let curr_month = months_array[date.getMonth()];
    let todays_day = date.getDate();
    let my_selected_date = `${todays_day.toString()} ${curr_month.toString()} ${date.getFullYear()}`
    const close_popup = new dismiss_popup_panel(page);
    close_popup.close_discount_popup();


    await page.getByTestId('date-display-field-start').click();
    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel(my_selected_date).first().click();

    todays_day = date.getDate()+1;
    my_selected_date = `${todays_day.toString()} ${curr_month.toString()} ${date.getFullYear()}`
    await page.addLocatorHandler(page.getByLabel('Dismiss sign in information.'),async()=>{
        await page.getByLabel('Dismiss sign in information.').click();
    })
    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel(my_selected_date).first().click();

    console.log('week',days_array[date.getDay()]);
    console.log('')

    const enteredStartDate = await (page.getByTestId('date-display-field-start').locator('span').textContent())
    const enteredEndDate = await (page.getByTestId('date-display-field-end').locator('span').textContent())
    expect(enteredEndDate).toContain(todays_day.toString());
    todays_day = todays_day-1;

    //Date validation
    expect(enteredStartDate).toContain(todays_day.toString());

    await page.getByPlaceholder('Where are you going?').fill('Goa');
    await page.getByRole('button',{name:'Search'}).click();
    await page.waitForLoadState();

    //Verifying if the filters for the hotel work
    const open_filter_list = await page.getByTestId('sorters-dropdown-trigger');
    await open_filter_list.click();
    await page.waitForLoadState();
    if(await page.getByLabel('Dismiss sign in information.').isVisible()){
        await page.getByLabel('Dismiss sign in information.').click();
    }
    const dropdown = page.getByTestId('sorters-dropdown');

    await dropdown.locator('ul>li').last().click();
    const titleOfPlace = await page.getByTestId('title-link').getByTestId('title').first().innerText();
    console.log(titleOfPlace);


    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        await page.getByTestId('availability-cta-btn').first().click()
    ])
    // await page2.waitForLoadState();
    const hotel_name = await page2.locator('#hp_hotel_name').locator('h2').innerText();
    console.log(hotel_name);

    expect(titleOfPlace).toBe(hotel_name);

    
    console.log('-----Starting the booking process------');
    await page2.locator('#hp_book_now_button').click();
    await page2.waitForLoadState();
    await page2.locator('#hp_book_now_button').click();
    await page2.waitForLoadState();
    await page2.getByTestId('user-details-firstname').fill('Mytester');
    await page2.getByTestId('user-details-lastname').fill('Tester');
    await page2.getByTestId('user-details-email').fill('test@test.com');
    await page2.getByTestId('phone-number-input').fill('4242424290');

    await page2.locator('#checkin_eta_hour').selectOption('-1');
    await page2.getByRole('button',{name:' Next: Final details '}).click();


    //Asserting all the fields
    await page2.waitForLoadState();
    console.log( await page2.locator('h1').textContent());
    expect(await page2.locator('h1').textContent()).toBe(hotel_name);

    console.log(await page2.locator('time:nth-of-type(1) > .b80bba4aba.e1eebb6a1e').textContent());
    let my_selected_date_short = `${current_day_of_the_week_string.toString()}, ${curr_month.slice(0,3).toString()} ${todays_day.toString()}, ${date.getFullYear().toString()}`
    console.log('My selected date created',my_selected_date_short);

    expect(await page2.locator('time:nth-of-type(1) > .b80bba4aba.e1eebb6a1e').textContent()).toBe(my_selected_date_short);

    //Adjusting the date to validate the checkout date

    todays_day = date.getDate()+1;
    current_day_of_the_week_string = days_array[date.getDay()];
    curr_month = months_array[date.getMonth()];
    my_selected_date_short = `${current_day_of_the_week_string.toString()}, ${curr_month.slice(0,3).toString()} ${todays_day.toString()}, ${date.getFullYear().toString()}`
    console.log('My selected date created for checkout ',my_selected_date_short);

    expect(await page2.locator('time:nth-of-type(2) > .b80bba4aba.e1eebb6a1e').textContent()).toBe(my_selected_date_short);

    console.log('Dates and hotel name verified');
    console.log('------TEST END-----');


    

})
