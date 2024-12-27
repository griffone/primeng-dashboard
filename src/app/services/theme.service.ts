import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private isDarkMode = new BehaviorSubject<boolean>(false);
  isDarkMode$ = this.isDarkMode.asObservable();

  toggleTheme() {
    this.isDarkMode.next(!this.isDarkMode.value);
    this.updateTheme();
  }

  private updateTheme() {
    const theme = this.isDarkMode.value ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
  }
}
