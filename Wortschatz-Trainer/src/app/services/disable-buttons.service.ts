import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DisableButtonsService {
  disabled: boolean = false;

  constructor() { }

  toggleDisable(){
    this.disabled = !this.disabled;
  }

  getDisabledStatus(): boolean{
    return this.disabled;
  }
}
