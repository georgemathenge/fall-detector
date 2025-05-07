import { Injectable } from '@angular/core';
import { AppComponent } from './app.component';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FallService {
  log$ = new Subject<string>();

  constructor() {}

  requestMotionPermission() {
    if (
      typeof DeviceMotionEvent !== 'undefined' &&
      typeof (DeviceMotionEvent as any).requestPermission === 'function'
    ) {
      (DeviceMotionEvent as any)
        .requestPermission()
        .then((response: string) => {
          if (response === 'granted') {
            this.log$.next('Motion access granted.');
            this.startMotionListener();
          } else {
            this.log$.next('Permission denied.');
          }
        })
        .catch((err:any) => {
          this.log$.next('Error requesting motion permission.');
          console.error(err);
        });
    } else {
      this.log$.next('No iOS motion permission required.');
      this.startMotionListener();
    }
  }

  startMotionListener() {
    this.log$.next('Listening for motion...');

    window.addEventListener('devicemotion', (event) => {
      const acc = event.accelerationIncludingGravity;
      if (!acc) return;

      const magnitude = Math.sqrt(
        (acc?.x ?? 0) ** 2 + (acc?.y ?? 0) ** 2 + (acc?.z ?? 0) ** 2
      );


      if (magnitude > 25) {
        this.log$.next(`Fall detected! Magnitude: ${magnitude.toFixed(2)}`);
      }
    });
  }
}
