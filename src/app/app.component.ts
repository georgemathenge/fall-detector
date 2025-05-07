import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { FallService } from './fall.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private fallService: FallService) {}

  ngOnInit() {
    this.fallService.log$.subscribe((msg) => {
      this.logMessage(msg);
    });
  }

  enableDetection() {
    this.logMessage('Enabling fall detection...');
    this.fallService.requestMotionPermission();
  }

  logMessage(message: string) {
    const logArea = document.getElementById('log');
    if (logArea) {
      logArea.innerHTML += `<p>${new Date().toLocaleTimeString()}: ${message}</p>`;
      logArea.scrollTop = logArea.scrollHeight;
    }
  }
}
