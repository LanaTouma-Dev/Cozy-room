import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PresenceService } from '../../core/services/presence';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-room',
  imports: [FormsModule],
  templateUrl: './room.html',
  styleUrl: './room.scss',
})
export class Room implements OnInit, OnDestroy {
  intention = '';
  intentionSet = false;

  secondsElapsed = 0;
  private timerInterval: any;

  othersInRoom = 0;
  private presenceSub: Subscription | null = null;

  constructor(private router: Router, private presence: PresenceService) {}

  ngOnInit() {
    this.timerInterval = setInterval(() => this.secondsElapsed++, 1000);
    this.presence.joinRoom();
    this.presenceSub = this.presence.othersInRoom$.subscribe(count => {
      this.othersInRoom = count;
    });
  }

  ngOnDestroy() {
    clearInterval(this.timerInterval);
    this.presenceSub?.unsubscribe();
    this.presence.leaveRoom();
  }

  setIntention() {
    if (this.intention.trim()) this.intentionSet = true;
  }

  get timeDisplay(): string {
    const h = Math.floor(this.secondsElapsed / 3600);
    const m = Math.floor((this.secondsElapsed % 3600) / 60);
    const s = this.secondsElapsed % 60;
    if (h > 0) return `${h}h ${m}m`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }

  get presenceText(): string {
    if (this.othersInRoom === 0) return 'just you in the room';
    if (this.othersInRoom === 1) return '1 other in the room';
    return `${this.othersInRoom} others in the room`;
  }

  leaveRoom() {
    this.router.navigate(['/']);
  }
}
