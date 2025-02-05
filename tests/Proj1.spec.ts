import {expect, test} from '@playwright/test'


//Navigating to the website
test.skip('playwright udemy prac',async({page})=>{
    page.goto('https://www.globalsqa.com/demo-site/draganddrop/');
    const frame = page.frameLocator(".demo-frame.lazyloaded");   
    await frame.locator('li',{hasText:'High Tatras 2'}).dragTo(frame.locator('#trash'));
})