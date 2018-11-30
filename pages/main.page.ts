import Page from "./page";

 export class Login_Page extends Page {
    private get form() {
        return browser.element("#signin_form")
    }

    public get email() {
        return browser.element("//input[@name = 'login']")
    }

    private get password() {
        return browser.element("//input[@name = 'password']")
    }

    private get login_btn() {
        return this.form.element(".//button[@type='submit']")
    }

    public open(): Login_Page {
        super.open('/signin/');
        this.form.waitForVisible();
        return this;
    }

    public login(login: string, password: string): void {
        this.email.setValue(login);
        this.password.setValue(password);
        this.login_btn.click();
    }
}

