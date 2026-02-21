import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class PresenceService {
  othersInRoom$ = new BehaviorSubject<number>(0);

  private socket: WebSocket | null = null;

  joinRoom() {
    this.socket = new WebSocket('ws://127.0.0.1:8000/ws/presence/');

    this.socket.onopen = () => {
      console.log('Connected to cozy room');
    };

    this.socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      // subtract yourself
      this.othersInRoom$.next(Math.max(0, data.count - 1));
    };

    this.socket.onclose = () => {
      console.log('Left the room');
    };

    this.socket.onerror = (err) => {
      console.error('Room connection error', err);
    };
  }

  leaveRoom() {
    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }
}