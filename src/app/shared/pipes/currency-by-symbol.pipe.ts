import { Pipe, PipeTransform } from '@angular/core';

type Currency = 'base' | 'quote';

@Pipe({
  name: 'currencyBySymbol',
  standalone: true,
})
export class CurrencyBySymbolPipe implements PipeTransform {
  transform(value: string | undefined, currency: Currency): unknown {
    if (!value) return;

    const [base, quote] = value.split('/');
    return currency === 'base' ? base : quote;
  }
}
