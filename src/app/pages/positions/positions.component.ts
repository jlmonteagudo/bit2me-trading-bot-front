import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PositionService } from '../../shared/services/positions.service';

@Component({
  selector: 'app-positions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './positions.component.html',
  styleUrl: './positions.component.scss',
})
export class PositionsComponent {
  readonly #positionService = inject(PositionService);
  positions = this.#positionService.positions;
}
