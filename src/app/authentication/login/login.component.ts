import { Component, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  readonly #authservice: AuthService = inject(AuthService);
  readonly #router: Router = inject(Router);

  email = '';
  password = '';
  showLoader: boolean | undefined;
  showPassword = false;
  invalidCredentials = false;
  toggleClass = 'off-line';

  async login() {
    try {
      await this.#authservice.loginWithEmail(this.email, this.password);
      this.#router.navigate(['/']);
    } catch (error: any) {
      this.invalidCredentials = true;
    }
  }

  toggleVisibility() {
    this.showPassword = !this.showPassword;
    this.toggleClass = this.toggleClass === 'off-line' ? 'line' : 'off-line';
  }
}
