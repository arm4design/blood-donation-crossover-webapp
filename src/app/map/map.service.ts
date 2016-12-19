import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';

@Injectable()
export class MapService {
    readonly SOCKET_URL: string = 'http://localhost:3000/map';
    private socket: SocketIOClient.Socket;

    constructor(readonly io: SocketIOClientStatic) {
        this.socket = io.connect(this.SOCKET_URL);
        this.socket.on('connection', (socket) => {
            console.log('socket connected');
        });
    }

    public emit(eventName: string, data: any) {
        this.socket.emit(eventName, data);
    }

}
