import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Message } from '../../types/Message';
import { Observable } from 'rxjs';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  updateTable: EventEmitter<Message> = new EventEmitter<Message>();
  url: string = environment.basePath + "/socket/";
  private stompClient!: any;
  public isLoaded: boolean = false;

  constructor(private http: HttpClient) { }

  post(data: Message): Observable<Message> {
    return this.http.post<Message>(this.url, data);
  }

  initializeWebSocketConnection() {
    let ws = new SockJS(this.url);
    this.stompClient = Stomp.over(ws);
    let that = this;

    this.stompClient.connect({}, function () {
      that.isLoaded = true;
      that.openGlobalSocket()
    });
    
  }

  openGlobalSocket() {
    if (this.isLoaded) {
      this.stompClient.subscribe("/socket-publisher", (message: { body: string; }) => {
        this.handleResult(message);
      });
    }
  }

  handleResult(message: { body: string; }): void {
    if (message.body) {
      let messageResult: Message = JSON.parse(message.body);
      console.log(messageResult)
      this.updateTable.emit(messageResult);
    }
  }

  getEmitter() {
    return this.updateTable;
  }

  sendMessageUsingSocket(mess: string, fromId: string) {
    let message: Message = {
      message: mess,
      fromId: fromId
    };
    this.stompClient.send("/socket-subscriber/send/message", {}, JSON.stringify(message));
  }

  disconnect() {
    this.stompClient.disconnect();
  }

}
