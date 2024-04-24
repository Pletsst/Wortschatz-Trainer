import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { DisableButtonsService } from './services/disable-buttons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    private router: Router,
    private disableButtonsService: DisableButtonsService
  ) {}

  navigateTo(route: string): void {
    if (!this.disableButtonsService.getDisabledStatus()) {
      this.router.navigateByUrl(route);
    }
  }
  
  title = 'Wortschatz-Trainer';
}
