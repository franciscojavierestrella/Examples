import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';
import { EditorModule } from '@tinymce/tinymce-angular';
import { ModuloemailModule } from './moduloemail/moduloemail.module';
import { AdminModule } from './admin/admin.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

// Componentes
import { TiendaComponent } from './Components/tienda/tienda.component';
import { ParquesComponent } from './Components/parques/parques.component';
import { HomeComponent } from './Components/home/home.component';
import { AnimalsComponent } from './Components/animals/animals.component';
import { ContactComponent } from './Components/contact/contact.component';
import { KeepersComponent } from './Components/keepers/keepers.component';
// import { MainComponent } from './admin/Components/main/main.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { AnimalDetailComponent } from './Components/animal-detail/animal-detail.component';



@NgModule({
  declarations: [
    AppComponent,
    TiendaComponent,
    ParquesComponent,
    HomeComponent,
    AnimalsComponent,
    ContactComponent,
    KeepersComponent,
    LoginComponent,
    RegisterComponent,
    UserEditComponent,
    AnimalDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    EditorModule,
    HttpModule,
    routing,
    ModuloemailModule,
    AdminModule,
    BrowserAnimationsModule
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
