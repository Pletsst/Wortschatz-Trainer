import { Component, ViewEncapsulation } from '@angular/core';
import { DisableButtonsService } from './services/disable-buttons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    public disableButtonsService: DisableButtonsService,
    private router: Router
  ) {}


  isRouteDisabled(route: string): boolean {
    return this.router.url === route || this.disableButtonsService.getDisabledStatus();
  }

  title = 'Wortschatz-Trainer';
}
