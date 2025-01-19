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
    // page.pause()
})

