import { Injectable } from '@angular/core';
import { RxStompService } from '@stomp/ng2-stompjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private stompService: RxStompService) {}

  //This method is responsible for configuring and activating the WebSocket connection using RxStompService
  connect(): void {
    this.stompService.configure({
      brokerURL: 'ws://localhost:8022/ws'
    });
    this.stompService.activate();
  }

//publish a message to a specific destination
//The /app/ prefix is often used as a convention to designate application-level messaging destinations.
  sendNotification(message: string): void {
    this.stompService.publish({
      destination: '/app/notification/private',
      body: message
    });
  }

    // Watch for incoming notifications (listen to notification) and subscribe to them
    subscribeToNotifications(callback: (message: any) => void): void {
      this.stompService.watch('/user/specific').subscribe(callback);
    }

}


