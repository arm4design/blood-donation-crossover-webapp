import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpService } from '../app.service.http';
import * as io from 'socket.io-client';

@Injectable()
export class DonorService {
    readonly BASE_URL: string = '/donor';
    readonly GEO_IP_URL: string = '//freegeoip.net/json/';

    constructor(readonly http: HttpService) {
    }

    getSubscription(id: any): Observable<any> {
        return this.http.get(this.BASE_URL + '/' + id);
    }

    postSubscription(data: any): Observable<any> {
        return this.http.post(this.BASE_URL, data);
    }

    updateSubscription(data: any): Observable<any> {
        return this.http.put(this.BASE_URL, data);
    }

    removeSubscription(id: number): Observable<any> {
        return this.http.delete(this.BASE_URL + '/' + id);
    }

    getUserInfo(): Observable<any> {
        return this.http.getExternal(this.GEO_IP_URL);
    }

}
