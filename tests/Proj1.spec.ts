import {expect, test} from '@playwright/test'


//Navigating to the website
test.beforeAll('Initial setup',async({page})=>{
    await page.goto('https://www.booking.com/');
    
    //Validating landing url
    console.log('1)-----Verifying if the URL is correct and we have navigated to the site------')
    await expect(page).toHaveURL('https://www.booking.com')


    //finding out tomorrow's date for booking
    let date = Date.now();

    await page.locator('.fcd9eec8fb').click();

})

