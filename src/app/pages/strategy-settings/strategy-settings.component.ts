import { Component, effect, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { StrategyService } from '../../shared/services/strategy.service';
import { StrategySettings } from '../../shared/interfaces/strategy-settings.interface';

@Component({
  selector: 'app-strategy-settings',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './strategy-settings.component.html',
  styleUrl: './strategy-settings.component.scss',
})
export class StrategySettingsComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #strategyService = inject(StrategyService);
  readonly #toastrService = inject(ToastrService);

  strategySettings = this.#strategyService.strategySettings;

  settingsForm = this.#formBuilder.group({
    candleInterval: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    numberOfCandles: [0, [Validators.required, Validators.pattern(/^\d+$/)]],
    stopLossPercentage: [
      0,
      [Validators.required, Validators.pattern(/^\d+(\.\d+)?$/)],
    ],
  });

  #strategySettingsEffect = effect(() => {
    this.settingsForm.patchValue({
      candleInterval: this.strategySettings()?.candleInterval,
      numberOfCandles: this.strategySettings()?.numberOfCandles,
      stopLossPercentage: this.strategySettings()?.stopLossPercentage,
    });
  });

  async saveStrategySettings() {
    try {
      if (!this.settingsForm.valid) throw new Error('The data is invalid');
      const settings = this.settingsForm.value as Partial<StrategySettings>;
      await this.#strategyService.saveSettings(settings);
      this.#toastrService.success('Settings saved', 'Success');
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }
}
