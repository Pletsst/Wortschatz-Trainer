import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainierenComponent } from './trainieren/trainieren.component';
import { ErfassenComponent } from './erfassen/erfassen.component';
import { PruefungComponent } from './pruefung/pruefung.component';

const routes: Routes = [
  {path: 'app-trainieren', component: TrainierenComponent},
  {path: 'app-erfassen', component: ErfassenComponent},
  {path: 'app-pruefung', component: PruefungComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
