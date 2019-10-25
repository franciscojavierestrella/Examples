import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MainEmailComponent } from './Components/main-email/main-email.component';
import { GuardarEmailComponent } from './Components/guardar-email/guardar-email.component';
import { MostrarEmailComponent } from './Components/mostrar-email/mostrar-email.component';


@NgModule({
  imports: [CommonModule, FormsModule],
  declarations: [GuardarEmailComponent, MostrarEmailComponent, MainEmailComponent],
  exports: [MainEmailComponent]
})
export class ModuloemailModule { }
