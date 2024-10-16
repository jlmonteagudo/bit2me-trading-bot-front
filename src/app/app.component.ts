import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { PushNotificationService } from './shared/services/push-notification.service';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  pushNotificationService = inject(PushNotificationService);

  constructor() {
    this.pushNotificationService.requestPermission();
    this.pushNotificationService.listen();
  }
}
