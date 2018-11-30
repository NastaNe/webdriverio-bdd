import Page from "./page";

export class Wish_Page extends Page {
    private get form() {
        return browser.element("//*[@name='wishlist-block-new']")
    }

    public get new_list() {
        return browser.element("//input[@name = 'login']")
    }

    public get wishlist_input() {
        return browser.element("//input[contains(@class, 'wishlist-i-rename-input-text')][1]")
    }

    public get save(){
        return browser.element("(//span[contains(@class, 'wishlist-i-rename-submit')]/button)[1]")
    }

    public open(): Wish_Page {
        super.open('/profile/wishlists/');
        this.form.waitForVisible();
        return this;
    }

    public addNewList(new_list_name:string)  {
        this.new_list.click();
        this.wishlist_input.waitForVisible();
        this.wishlist_input.setValue(new_list_name);
        this.save.click();
    }
}

