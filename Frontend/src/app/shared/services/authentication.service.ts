import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import decode from 'jwt-decode';

@Injectable()
export class AuthenticationService {
    private token: string;
    private currentUser: string;
    private grant_type: string ;
    private jwtApi: string;
    private contentTypeValue: string;

    constructor( private http: Http ) {
        this.currentUser = 'currentUser';
        this.grant_type = 'password';
        this.jwtApi = 'http://localhost:8888/api/accounts/token';
        this.contentTypeValue = 'application/x-www-form-urlencoded';
        // set token if saved in local storage
        this.token = localStorage.getItem(this.currentUser);
    }

    body = new URLSearchParams();
    headers = new Headers();

    login(username: string, password: string): Observable<boolean> {
        this.body.set('username', username);
        this.body.set('password', password);
        this.body.set('grant_type', this.grant_type);
        this.headers.append('Content-Type', this.contentTypeValue);
        return this.http.post(this.jwtApi, this.body.toString())
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                const token = response.json() && response.json().access_token;
                if (token) {
                    // set token property
                    this.token = token;

                    // store username and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem(this.currentUser, this.token);
                    // return true to indicate successful login
                    return true;
                } else {
                    // return false to indicate failed login
                    return false;
                }
            });
    }
    logout(): void {
        // clear token remove user from local storage to log user out
        this.token = null;
        localStorage.removeItem(this.currentUser);
    }
    getRole(): string {
        const token = localStorage.getItem(this.currentUser);
        const tokenPayload = decode(token);
        const role = tokenPayload.role;
        return role;
    }
}
