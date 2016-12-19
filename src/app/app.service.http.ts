import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';
import { AppConfig } from './app.config';

@Injectable()
export class HttpService {
    readonly API_URL: string = AppConfig.WEBSERVICE + '/api/v1';

    constructor(readonly http: Http) {
    }

    get(uri: string): Observable<any> {
        return this.http.get(this.API_URL + uri)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getExternal(url: string): Observable<any> {
        return this.http.get(url)
            .map(this.extractData)
            .catch(this.handleError);
    }

    post(uri: string, data: any): Observable<any> {
        return this.http.post(this.API_URL + uri, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    put(uri: string, data: any): Observable<any> {
        return this.http.put(this.API_URL + uri, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    delete(uri: string): Observable<any> {
        return this.http.delete(this.API_URL + uri)
            .map(this.extractData)
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
        let errMsg: string;
        if (error instanceof Response) {
            const body = error.json() || '';
            const err = body.error || JSON.stringify(body);
            errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
        } else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Observable.throw(errMsg);
    }

}
