import { DecimalPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profit-simulation',
  standalone: true,
  imports: [ReactiveFormsModule, DecimalPipe],
  templateUrl: './profit-simulation.component.html',
  styleUrl: './profit-simulation.component.scss'
})
export class ProfitSimulationComponent {
  readonly #formBuilder = inject(FormBuilder);

  profit: { simpleInterest: number, compoundInterest: number } | undefined = undefined;

  profitSimulationForm = this.#formBuilder.group({
    initialCapital: [1000, [Validators.required, Validators.min(0), Validators.max(1_000_000)]],
    days: [20, [Validators.required, Validators.min(0), Validators.max(100)]],
    operationsPerDay: [5, [Validators.required, Validators.min(0), Validators.max(100)]],
    profitPercentagePerOperation: [0.5, [Validators.required, Validators.min(0), Validators.max(100)]],
  });

  simulate() {
    const profitSimulation = this.profitSimulationForm.value;
    const initialCapital = profitSimulation.initialCapital || 0;
    const days = profitSimulation.days || 0;
    const operationsPerDay = profitSimulation.operationsPerDay || 0;
    const profitPercentagePerOperation = profitSimulation.profitPercentagePerOperation || 0;

    const simpleInterest = this.getSimpleInterest(initialCapital, days, operationsPerDay, profitPercentagePerOperation);
    const compoundInterest = this.getCompoundInterest(initialCapital, days, operationsPerDay, profitPercentagePerOperation);

    this.profit = { simpleInterest, compoundInterest };
  }

  getSimpleInterest(initialCapital: number, days: number, operationsPerDay: number, profitPercentagePerOperation: number): number {
    return initialCapital * days * operationsPerDay * profitPercentagePerOperation / 100;
  }

  getCompoundInterest(initialCapital: number, days: number, operationsPerDay: number, profitPercentagePerOperation: number): number {
    return initialCapital * (1 + profitPercentagePerOperation / 100) ** (days * operationsPerDay) - initialCapital;
  }
}
