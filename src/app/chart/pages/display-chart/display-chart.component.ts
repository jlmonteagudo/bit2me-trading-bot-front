import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PriceChartComponent } from '../../components/price-chart/price-chart.component';

@Component({
  selector: 'app-display-chart',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, PriceChartComponent],
  templateUrl: './display-chart.component.html',
  styleUrl: './display-chart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisplayChartComponent {
  symbolControl = new FormControl('');
  symbol: string = '';

  selectSymbol(): void {
    this.symbol = this.symbolControl.value || '';
    console.log('Selected symbol:', this.symbol);
  }
}
