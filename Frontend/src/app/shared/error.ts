import { Injectable } from '@angular/core';
@Injectable()
export class ErrorList {
    public LOGIN_MESSAGE_ERROR: string;
    public LOGIN_MESSAGE_SUCCESS: string;
    public reGexPassword: RegExp;
    public reGexUsername: RegExp;
    // Login errors list
    private _LOGIN_E001: string;
    get LOGIN_E001() {
        return this._LOGIN_E001 = 'Username or password is incorrect!';
    }
    private _LOGIN_E002: string;
    get LOGIN_E002() {
        return this._LOGIN_E002 = 'Username not allow any special characters and at least ';
    }
    private _LOGIN_E003: string;
    get LOGIN_E003() {
        return this._LOGIN_E003 = 'Password must have at least 1 uppercase, lowercase, special character and number!';
    }
    constructor() {
        // Login message
        this.LOGIN_MESSAGE_ERROR = 'Error!';
        this.LOGIN_MESSAGE_SUCCESS = 'Success!';
        // Login Regular Expression
        this.reGexPassword = /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9)(?=.*[a-z])/;
        this.reGexUsername = /[<>'+\"\/`\\\[\]^={}%;@#!$&*()?:| ]/;
    }
}
