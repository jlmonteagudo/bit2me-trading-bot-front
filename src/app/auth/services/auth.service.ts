import { Injectable, inject } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly #authentication = inject(AngularFireAuth);
  readonly #router = inject(Router);

  isUserAuthenticated$ = this.#authentication.authState.pipe(
    map((user) => !!user)
  );

  async loginWithEmail(email: string, password: string): Promise<void> {
    try {
      await this.#authentication.signInWithEmailAndPassword(email, password);
    } catch (error) {
      throw error;
    }
  }

  async logout(): Promise<void> {
    await this.#authentication.signOut();
    this.#router.navigate(['/auth/login']);
  }
}
