import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-trading-requirements-alert',
    standalone: true,
    imports: [CommonModule],
    template: `
    <div class="alert alert-danger" role="alert">
      Trading <a href="https://gist.github.com/jlmonteagudo/4ec6c3ee3c6630c47449b95ebcffeb1d" class="alert-link">requirements</a> before opening a new position
    </div>
    `
})
export class TradingRequirementsAlertComponent { }
