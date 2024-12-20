import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingsService } from '../../services/settings.service';
import { Settings } from '../../interfaces/settings.interface';

const ValidatorPercentage = Validators.pattern(/^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$/)

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class SettingsComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #settingsService = inject(SettingsService);
  readonly #toastrService = inject(ToastrService);

  settings = this.#settingsService.settings;

  settingsForm = this.#formBuilder.group({
    initialTakeProfitPercentage: [0, [Validators.required, ValidatorPercentage]],
    initialStopLossPercentage: [0, [Validators.required, ValidatorPercentage]],
    trailingTakeProfitPercentage: [0, [Validators.required, ValidatorPercentage]],
    trailingStopLossPercentage: [0, [Validators.required, ValidatorPercentage]],
    quoteCurrency: ['', [Validators.required]],
    quoteVolumeLimit: [0, [Validators.required, Validators.min(0), Validators.max(100_000_000)]],
    emaFastPeriod: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
    emaSlowPeriod: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
    rsiPeriod: [0, [Validators.required, Validators.min(0), Validators.max(1000)]],
  });

  #settingsEffect = effect(() => {
    this.settingsForm.patchValue({
      initialTakeProfitPercentage: this.settings()?.initialTakeProfitPercentage,
      initialStopLossPercentage: this.settings()?.initialStopLossPercentage,
      trailingTakeProfitPercentage: this.settings()?.trailingTakeProfitPercentage,
      trailingStopLossPercentage: this.settings()?.trailingStopLossPercentage,
      quoteCurrency: this.settings()?.quoteCurrency,
      quoteVolumeLimit: this.settings()?.quoteVolumeLimit,
      emaFastPeriod: this.settings()?.emaFastPeriod,
      emaSlowPeriod: this.settings()?.emaSlowPeriod,
      rsiPeriod: this.settings()?.rsiPeriod,
    });
  });

  async saveSettings() {
    try {
      if (!this.settingsForm.valid) throw new Error('The data is invalid');
      const settings = this.settingsForm.value as Partial<Settings>;
      await this.#settingsService.saveSettings(settings);
      this.#toastrService.success('Settings saved', 'Success');
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }
}
