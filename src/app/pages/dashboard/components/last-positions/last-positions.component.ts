import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Position } from '../../../../shared/interfaces/position.interface';

@Component({
  selector: 'app-last-positions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './last-positions.component.html',
  styleUrl: './last-positions.component.scss',
})
export class LastPositionsComponent {
  lastPositions = input<Position[]>();
}
