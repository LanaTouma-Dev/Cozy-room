import { Routes } from '@angular/router';
import { Landing } from './features/landing/landing';
import { Room } from './features/room/room';

export const routes: Routes = [
  { path: '', component: Landing },
  { path: 'room', component: Room },
  { path: '**', redirectTo: '' }
];
