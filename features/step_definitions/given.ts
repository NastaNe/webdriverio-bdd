import {Login_Page} from "../../pages/main.page";

const {Given} = require('cucumber');

Given(/^Sign in with login:"(.*?)" and password:"(.*?)"/, function (login:string, password:string) {
    let login_page = new Login_Page();
    login_page.open().login(login, password);
});