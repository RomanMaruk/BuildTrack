import { Injectable, signal } from '@angular/core';

const COLLAPSED_KEY = 'buildtrack_sidebar_collapsed';

@Injectable({ providedIn: 'root' })
export class SidebarStateService {
  readonly collapsed = signal(this.readStoredState());
  readonly mobileOpen = signal(false);

  toggleCollapsed(): void {
    this.setCollapsed(!this.collapsed());
  }

  setCollapsed(collapsed: boolean): void {
    this.collapsed.set(collapsed);
    localStorage.setItem(COLLAPSED_KEY, JSON.stringify(collapsed));
  }

  toggleMobileOpen(): void {
    this.mobileOpen.update((isOpen) => !isOpen);
  }

  closeMobile(): void {
    this.mobileOpen.set(false);
  }

  private readStoredState(): boolean {
    const stored = localStorage.getItem(COLLAPSED_KEY);
    return stored ? (JSON.parse(stored) as boolean) : false;
  }
}
