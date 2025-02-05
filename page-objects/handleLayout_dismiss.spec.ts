import { Page } from "@playwright/test";


export class dismiss_popup_panel{

    readonly page:Page
    constructor(page){
        this.page=page;
    }

    async close_discount_popup(){
        await this.page.addLocatorHandler(this.page.getByLabel('Dismiss sign in information.'),async()=>{
            await this.page.getByLabel('Dismiss sign in information.').click();
        })
    }
}