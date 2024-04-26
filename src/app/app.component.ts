import { Component, ViewEncapsulation } from '@angular/core';
import { DisableButtonsService } from './services/disable-buttons.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(
    public disableButtonsService: DisableButtonsService
  ) {}

  title = 'Wortschatz-Trainer';
}