import { Injectable } from '@angular/core';
@Injectable()
export class ErrorList {
    public LOGIN_MESSAGE_ERROR: string;
    public LOGIN_MESSAGE_SUCCESS: string;
    public reGexPassword: RegExp;
    public reGexUsername: RegExp;
    // Login errors list
    public LOGIN_E001: string;
    public LOGIN_E002: string;
    public LOGIN_E003: string;
    public LOGIN_E004: string;
    public LOGIN_E005: string;
    public LOGIN_E006: string;
    public LOGIN_E007: string;

    constructor() {
        // Login message
        this.LOGIN_MESSAGE_ERROR = 'Error!';
        this.LOGIN_MESSAGE_SUCCESS = 'Success!';
        // Login Regular Expression
        this.reGexPassword = /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9)(?=.*[a-z])/;
        this.reGexUsername = /[<>'+\"\/`\\\[\]^={}%;@#!$&*()?:| ]/;

        this.LOGIN_E001 = 'Username or password is incorrect!';
        this.LOGIN_E002 = 'Username can not be blank!';
        this.LOGIN_E003 = 'Username must be at least ';
        this.LOGIN_E004 = 'Username not allow any special characters!';

        this.LOGIN_E005 = 'Password can not be blank!';
        this.LOGIN_E006 = 'Password must be at least ';
        this.LOGIN_E007 = 'Password must have at least 1 uppercase, lowercase, special character and number!';

    }
}
