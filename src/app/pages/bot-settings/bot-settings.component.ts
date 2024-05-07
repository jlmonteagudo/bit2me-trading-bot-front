import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BotService } from '../../shared/services/bot.service';
import { BotSettings } from '../../shared/interfaces/bot-settings.interface';

@Component({
  selector: 'app-bot-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './bot-settings.component.html',
  styleUrl: './bot-settings.component.scss',
})
export class BotSettingsComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #botService = inject(BotService);
  readonly #toastrService = inject(ToastrService);

  botSettings = this.#botService.botSettings;

  settingsForm = this.#formBuilder.group({
    cycleInterval: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  #botSettingsEffect = effect(() => {
    this.settingsForm.patchValue({
      cycleInterval: this.botSettings()?.cycleInterval,
    });
  });

  async saveBotSettings() {
    try {
      if (!this.settingsForm.valid) throw new Error('The data is invalid');
      const settings = this.settingsForm.value as Partial<BotSettings>;
      await this.#botService.saveSettings(settings);
      this.#toastrService.success('Settings saved', 'Success');
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }
}
