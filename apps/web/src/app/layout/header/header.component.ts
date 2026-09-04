import { Component, input } from '@angular/core';
import type { IUserRegister } from '@build-track/types';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SidebarStateService } from '../sidebar-state.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public user = input.required<IUserRegister>();

  constructor(readonly sidebarState: SidebarStateService) {}

  toggleSidebarCollapsed(): void {
    this.sidebarState.toggleCollapsed();
  }
}
