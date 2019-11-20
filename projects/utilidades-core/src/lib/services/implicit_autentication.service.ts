
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Md5 } from 'ts-md5'

@Injectable({
    providedIn: 'root',
})

export class ImplicitAutenticationService {
    
    environment: any;
    logout_url: any;
    bearer: { headers: HttpHeaders; };
    params: any;
    payload: any;

    init(entorno): any {
        this.environment = entorno;

        if (window.localStorage.getItem('access_token') === null ||
            window.localStorage.getItem('access_token') === undefined) {
            var params = {},
                queryString = location.hash.substring(1),
                regex = /([^&=]+)=([^&]*)/g;
            let m;
            while (m = regex.exec(queryString)) {

                params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
            }
            // And send the token over to the server
            const req = new XMLHttpRequest();
            // consider using POST so query isn't logged
            const query = 'https://' + window.location.host + '?' + queryString;
            req.open('GET', query, true);
            if (params['id_token'] !== null && params['id_token'] !== undefined) {
                window.localStorage.setItem('access_token', params['access_token']);
                //if token setear
                window.localStorage.setItem('id_token', params['id_token']);
                window.localStorage.setItem('expires_in', params['expires_in']);
                window.localStorage.setItem('state', params['state']);
            } else {
                this.clearStorage();
            }
            req.onreadystatechange = function (e) {
                if (req.readyState === 4) {
                    if (req.status === 200) {
                        // window.location = params.state;
                    } else if (req.status === 400) {
                        window.alert('There was an error processing the token.');
                    } else {

                    }
                }
            };
        }
        this.setExpiresAt();
        this.timer();
        this.clearUrl();
    }

    

    constructor() {
        this.bearer = {
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'authorization': 'Bearer ' + window.localStorage.getItem('access_token'),
            }),
        }
    }

    public logout() {
        this.logout_url = this.environment.SIGN_OUT_URL;
        this.logout_url += '?id_token_hint=' + window.localStorage.getItem('id_token');
        this.logout_url += '&post_logout_redirect_uri=' + this.environment.SIGN_OUT_REDIRECT_URL;
        this.logout_url += '&state=' + window.localStorage.getItem('state');
        this.clearStorage();
        window.location.replace(this.logout_url);
    }

    public getPayload() {
        const id_token = window.localStorage.getItem('id_token').split('.');
        return JSON.parse(atob(id_token[1]));
    }


    public logoutValid() {
        var state;
        var valid = true;
        var queryString = location.search.substring(1);
        var regex = /([^&=]+)=([^&]*)/g;
        var m;
        while (!!(m = regex.exec(queryString))) {
            state = decodeURIComponent(m[2]);
        }
        console.info("state: "+state)
        if (window.localStorage.getItem('state') === state) {
            this.clearStorage();
            valid = true;
        } else {
            valid = false;
        }
        return valid;
    }

    // el flag es un booleano que define si abra boton de login
    public login(flag) {
        if (window.localStorage.getItem('id_token') === 'undefined' || window.localStorage.getItem('id_token') === null || this.logoutValid()) {
            if (!flag) {
                this.getAuthorizationUrl()
            }
            return false
        } else {
            return true
        }
    }
    public live() {
        if (this.login(true)) {
            return true;
        } else {
            return false;
        }

    }


    public clearUrl() {
        const clean_uri = window.location.origin + window.location.pathname;
        window.history.replaceState({}, document.title, clean_uri);
    }




    public getAuthorizationUrl() {
        this.params = this.environment;
        if (!this.params.nonce) {
            this.params.nonce = this.generateState();
        }
        if (!this.params.state) {
            this.params.state = this.generateState();
        }
        let url = this.params.AUTORIZATION_URL + '?' +
            'client_id=' + encodeURIComponent(this.params.CLIENTE_ID) + '&' +
            'redirect_uri=' + encodeURIComponent(this.params.REDIRECT_URL) + '&' + // + window.location.href + '&' para redirect con regex
            'response_type=' + encodeURIComponent(this.params.RESPONSE_TYPE) + '&' +
            'scope=' + encodeURIComponent(this.params.SCOPE) + '&' +
            'state_url=' + encodeURIComponent(window.location.hash);
        if (this.params.nonce) {
            url += '&nonce=' + encodeURIComponent(this.params.nonce);
        }
        url += '&state=' + encodeURIComponent(this.params.state);
        window.location.replace(url);
        return url;
    }

    public generateState() {
        const text = ((Date.now() + Math.random()) * Math.random()).toString().replace('.', '');
        return Md5.hashStr(text);
    }

    public setExpiresAt() {
        if (window.localStorage.getItem('expires_at') === null || window.localStorage.getItem('expires_at') === undefined || window.localStorage.getItem('expires_at') === 'Invalid Date') {
            const expires_at = new Date();
            expires_at.setSeconds(expires_at.getSeconds() + parseInt(window.localStorage.getItem('expires_in'), 10) - 60);
            window.localStorage.setItem('expires_at', expires_at.toUTCString());
        }
    }

    public expired() {
        return (new Date(window.localStorage.getItem('expires_at')) < new Date());
    }

    public timer() {

        setInterval(() => {
            if (window.localStorage.getItem('expires_at') !== null) {
                if (this.expired()) {
                    this.logout();
                    this.clearStorage();
                }
            } else {
                window.location.reload();
            }
        }, 5000)
    }

    public clearStorage() {
        window.localStorage.removeItem('access_token');
        window.localStorage.removeItem('id_token');
        window.localStorage.removeItem('expires_in');
        window.localStorage.removeItem('state');
        window.localStorage.removeItem('expires_at');

    }
}
