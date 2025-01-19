import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotificationsService } from '../../services/notifications.service';

@Component({
  selector: 'app-notify-entry-signal',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './notify-entry-signal.component.html',
  styleUrl: './notify-entry-signal.component.scss'
})
export class NotifyEntrySignalComponent {
  readonly #notificationsService = inject(NotificationsService);

  notifyEntrySignal = false;

  notifications = this.#notificationsService.notifications;

  #notificationsEffect = effect(() => {
    this.notifyEntrySignal = this.notifications()?.notifyEntrySignal || false;
  });

  toggleNotifyEntrySignal(value: boolean) {
    this.#notificationsService.saveNotifyEntrySignal(value);
  }
}
