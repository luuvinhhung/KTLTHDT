import { Injectable } from '@angular/core';
@Injectable()
export class ErrorList {
    public MESSAGE_ERROR: string;
    public MESSAGE_SUCCESS: string;
    public EMPLOYEE_MESSAGE_ADDED: string;
    public EMPLOYEE_MESSAGE_EDITED: string;
    public reGexPassword: RegExp;
    public reGexUsername: RegExp;
    // FORMAT errors list
    public FORMAT_E001: string;
    public FORMAT_E002: string;
    public FORMAT_E003: string;
    public FORMAT_E004: string;
    public FORMAT_E005: string;
    public FORMAT_E006: string;
    public FORMAT_E007: string;
    // Employee errors list
    public EMPLOYEE_E001: string;
    public EMPLOYEE_E002: string;
    public EMPLOYEE_E003: string;

    constructor() {
        // Message
        this.MESSAGE_ERROR = 'Error!';
        this.MESSAGE_SUCCESS = 'Success!';
        this.EMPLOYEE_MESSAGE_ADDED = 'Employee Added!';
        this.EMPLOYEE_MESSAGE_EDITED = 'Saved!';
        // Regular Expression
        this.reGexPassword = /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9)(?=.*[a-z])/;
        this.reGexUsername = /[<>'+\"\/`\\\[\]^={}%;@#!$&*()?:| ]/;
        // FORMAT error
        this.FORMAT_E001 = 'Username or password is incorrect!';
        this.FORMAT_E002 = 'Username can not be blank!';
        this.FORMAT_E003 = 'Username must be at least ';
        this.FORMAT_E004 = 'Username not allow any special characters!';

        this.FORMAT_E005 = 'Password can not be blank!';
        this.FORMAT_E006 = 'Password must be at least ';
        this.FORMAT_E007 = 'Password must have at least 1 uppercase, lowercase, special character and number!';
        // Add employee error
        this.EMPLOYEE_E001 = 'Confirm Password Not Match!';
        this.EMPLOYEE_E002 = 'Phone Numbers must be Numeric only!';
        this.EMPLOYEE_E003 = 'Phone are required!';
    }
}
