import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ButtonModule } from '@openng/optimus-ui/button';
import { SidebarStateService } from '../sidebar-state.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, ButtonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
})
export class SidebarComponent {
  constructor(readonly sidebarState: SidebarStateService) {}

  close(): void {
    this.sidebarState.closeMobile();
  }
}
