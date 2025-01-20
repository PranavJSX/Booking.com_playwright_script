import {expect, test} from '@playwright/test'


//Navigating to the websit

test('Initial setup',async({page})=>{
    await page.goto('https://www.booking.com/');
    
    //Validating landing url
    console.log('1)-----Verifying if the URL is correct and we have navigated to the site------')
    await expect(page).toHaveURL('https://www.booking.com')


    //finding out tomorrow's date for booking
    let date = new Date();
    date.setDate(date.getDate()+1);
    // const expected_date = date.
    console.log(date);
    await page.getByTestId('date-display-field-start').click();
    let todays_day = date.getDate();
    console.log(todays_day);
    console.log(todays_day.toString())
    // page.pause()
    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel('19 January 2025').first().click();

    await page.getByTestId('searchbox-datepicker-calendar').first().getByLabel('20 January 2025').first().click();
    
    const my_str = await (page.getByTestId('date-display-field-start').locator('span').textContent())
    await page.waitForTimeout(30000);
    // console.log(my_str);
    // expect(my_str).toStrictEqual('')
    // await page.getByTestId('searchbox-datepicker-calendar').first().getByText('20',{exact:true}).first().click();


})

