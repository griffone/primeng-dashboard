import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
/* --- */
import { Component, inject } from '@angular/core';
import { provideRouter, RouterOutlet, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { MenubarModule } from 'primeng/menubar';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';
/* --- */
import { ThemeService } from './app/services/theme.service';
import { HomeComponent } from './app/components/home/home/home.component';
import { GamesComponent } from './app/components/games/games/games.component';
import { PlatformsComponent } from './app/components/platforms/platforms/platforms.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MenubarModule,
    InputSwitchModule,
    FormsModule
  ],
  template: `
    <div [ngClass]="{'dark-theme': (themeService.isDarkMode$ | async)}">
      <p-menubar [model]="items">
        <ng-template pTemplate="end">
          <p-inputSwitch 
            [(ngModel)]="darkMode" 
            (onChange)="toggleTheme()"
          ></p-inputSwitch>
          <span class="ml-2">{{ darkMode ? 'Dark' : 'Light' }} Mode</span>
        </ng-template>
      </p-menubar>

      <div class="container">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [`
    .container {
      padding: 2rem;
    }
    :host {
      display: block;
      min-height: 100vh;
    }
    .dark-theme {
      background-color: #1e1e1e;
      color: #ffffff;
    }
  `]
})
export class App {
  items = [
    {
      label: 'Home',
      icon: 'pi pi-home',
      routerLink: ['/']
    },
    {
      label: 'Juegos',
      icon: 'pi pi-gamepad',
      routerLink: ['/games']
    },
    {
      label: 'Plataformas',
      icon: 'pi pi-desktop',
      routerLink: ['/platforms']
    }
  ];

  darkMode = false;
  themeService = inject(ThemeService);

  toggleTheme() {
    this.themeService.toggleTheme();
  }
}

const routes = [
  { path: '', component: HomeComponent },
  { path: 'games', component: GamesComponent },
  { path: 'platforms', component: PlatformsComponent }
];

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    provideRouter(routes),
    importProvidersFrom(BrowserAnimationsModule),
  ]
});