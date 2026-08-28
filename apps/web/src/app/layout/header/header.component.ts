import { Component, input } from '@angular/core';
import type { IUserRegister } from '@build-track/types';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public user = input.required<IUserRegister>();
}
