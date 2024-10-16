import { inject, Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';

@Injectable({
  providedIn: 'root',
})
export class PushNotificationService {
  readonly #messaging = inject(AngularFireMessaging);
  readonly #database = inject(AngularFireDatabase);
  readonly #tokenPath = '/manual-trading/simulation/settings/notifications/token';

  requestPermission() {
    this.#messaging.requestToken.subscribe(
      (token) => {
        console.log('Token received');
        this.#database.object(this.#tokenPath).set(token);
      },
      (error) => {
        console.error('Error receiving the token', error);
      }
    );
  }

  listen() {
    this.#messaging.messages.subscribe((message) => {
      console.log('Push notification received:', message);
      this.triggerVibration();
      this.playSound();
    });
  }

  triggerVibration() {
    if (navigator.vibrate) {
      navigator.vibrate(200);
    }
  }

  playSound() {
    const audio = new Audio('assets/sound/beep.mp3');
    audio.play();
  }
}
