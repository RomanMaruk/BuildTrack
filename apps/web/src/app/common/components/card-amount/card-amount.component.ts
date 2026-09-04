import { Component, input } from '@angular/core';

export type CardAmountVariant = 'blue' | 'green' | 'purple' | 'orange';

@Component({
  selector: 'app-card-amount',
  imports: [],
  templateUrl: './card-amount.component.html',
  styleUrl: './card-amount.component.scss',
})
export class CardAmountComponent {
  title = input('');
  mainAmount = input('');
  secondaryAmount = input('');
  icon = input('pi-dollar');
  variant = input<CardAmountVariant>('blue');
}
