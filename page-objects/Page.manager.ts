import test, { Page } from "@playwright/test";

export class PageManager{
    private readonly page:Page

    constructor(page){
        this.page = page
    }
}