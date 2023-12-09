/* import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class WebSocketService {

  private stompClient: Stomp.Client;
  private URL=environment.apiBaseUrlTask;
  constructor() { }

  public connect() {
    const socket = new SockJS( `${this.URL}/notif/websocket`);
    this.stompClient = Stomp.over(socket);
    return this.stompClient;
  }

  public sendMessage(message: string) {
    this.stompClient.send('/app/addProject', {}, message);
  }

  public subscribeToTopic() {
    return this.stompClient.subscribe('/topic/projectAdded');
  }
}
 */
