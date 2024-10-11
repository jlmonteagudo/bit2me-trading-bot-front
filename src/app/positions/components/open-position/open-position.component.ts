import { Component, inject, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OpenPosition } from '../../interfaces/open-position.interface';

@Component({
  selector: 'app-open-position',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './open-position.component.html',
  styleUrl: './open-position.component.scss'
})
export class OpenPositionComponent {
  readonly #formBuilder = inject(FormBuilder);
  readonly #toastrService = inject(ToastrService);

  newOpenPosition = output<OpenPosition>();

  positionForm = this.#formBuilder.group({
    symbol: ['BTC/EUR', [Validators.required]],
    quoteOrderAmount: [50000, [Validators.required, Validators.pattern(/^\d+$/)]],
  });

  async savePosition() {
    try {
      if (!this.positionForm.valid) throw new Error('The data is invalid');
      const openPosition = this.positionForm.value as OpenPosition;
      this.newOpenPosition.emit(openPosition);
    } catch (error: any) {
      this.#toastrService.error(error.message, 'Error');
    }
  }
}
