import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { computed, inject, Injectable, PLATFORM_ID, signal } from '@angular/core';

type Theme = 'light' | 'dark';

const THEME_STORAGE_KEY = 'buildtrack-theme';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  private readonly platformId = inject(PLATFORM_ID);
  private readonly theme = signal<Theme>(this.getInitialTheme());

  readonly isDark = computed(() => this.theme() === 'dark');

  constructor() {
    this.applyTheme(this.theme());
  }

  toggle(): void {
    const nextTheme: Theme = this.isDark() ? 'light' : 'dark';
    this.theme.set(nextTheme);
    this.applyTheme(nextTheme);
  }

  private getInitialTheme(): Theme {
    if (!isPlatformBrowser(this.platformId)) {
      return 'light';
    }

    const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
    return storedTheme === 'dark' ? 'dark' : 'light';
  }

  private applyTheme(theme: Theme): void {
    this.document.documentElement.classList.toggle('app-dark', theme === 'dark');

    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(THEME_STORAGE_KEY, theme);
    }
  }
}
