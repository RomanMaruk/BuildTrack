import { Component, inject, input } from '@angular/core';
import type { IUserRegister } from '@build-track/types';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SidebarStateService } from '../sidebar-state.service';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public user = input.required<IUserRegister>();
  readonly sidebarState = inject(SidebarStateService);
  readonly themeService = inject(ThemeService);

  toggleSidebarCollapsed(): void {
    this.sidebarState.toggleCollapsed();
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }
}
