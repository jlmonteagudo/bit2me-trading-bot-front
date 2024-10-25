import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'symbolCurrency',
  standalone: true
})
export class SymbolCurrencyPipe implements PipeTransform {
  transform(value: string, currency: 'base' | 'quote'): unknown {
    const [base, quote] = value.split('/');
    return currency === 'base' ? base : quote;
  }
}
