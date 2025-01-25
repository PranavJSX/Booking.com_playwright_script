import {expect, test} from '@playwright/test'
import exp from 'constants';


//Navigating to the websit


test.beforeEach('initial setup',async ({page})=>{
    await page.goto('https://www.booking.com/');
    
    //Validating landing url
    console.log('1)-----Verifying if the URL is correct and we have navigated to the site------');
    await expect(page).toHaveURL('https://www.booking.com');
    await page.waitForLoadState();
    await page.addLocatorHandler(page.getByLabel('Dismiss sign in information.'),async()=>{
        await page.getByLabel('Dismiss sign in information.').click();
    })
})

test('Checking the hotel booking filters',async({page,context})=>{
    
    // page.waitForSelector(close_button);

    //finding out tomorrow's date for booking
    console.log('2)-----Verifying if the date is correctly selected ------')
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
    await page.addLocatorHandler(page.getByLabel('Dismiss sign in information.'),async()=>{
        await page.getByLabel('Dismiss sign in information.').click();
    })
    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel(my_selected_date).click();
    console.log(`Booking end date  --- ` , todays_day);

    const enteredStartDate = await (page.getByTestId('date-display-field-start').locator('span').textContent())
    const enteredEndDate = await (page.getByTestId('date-display-field-end').locator('span').textContent())
    expect(enteredEndDate).toContain(todays_day.toString());
    todays_day = todays_day-1;

    //Date validation
    expect(enteredStartDate).toContain(todays_day.toString());

    await page.getByPlaceholder('Where are you going?').fill('Pune');
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
    // const filterList = dropdown.locator('ul > li');
    let counter = 1;
    for (const li of await dropdown.locator('ul>li').all()){
        await li.click();
        page.waitForLoadState();
        console.log(`Loaded ${counter} times .----verifying if the filters are working`);
        counter++;
        await open_filter_list.click();
    }
    await expect.soft(counter).toBe(10);
    const titleOfPlace = await page.getByTestId('title-link').getByTestId('title').first().innerText();
    console.log(titleOfPlace);


    const [page2] = await Promise.all([
        context.waitForEvent('page'),
        await page.getByTestId('availability-cta-btn').first().click()
    ])
    await page2.waitForLoadState();
    const hotel_name = await page2.locator('#hp_hotel_name').locator('h2').innerText();
    console.log(hotel_name);
    expect(titleOfPlace).toBe(hotel_name);

})

