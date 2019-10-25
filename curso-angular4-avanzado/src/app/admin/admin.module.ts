import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpModule} from '@angular/http';
import { AdeminRoutingModule} from './admin-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MainComponent } from './Components/main/main.component';
import { AddComponent } from './Components/add/add.component';
import { EditComponent } from './Components/edit/edit.component';
import { ListComponent } from './Components/list/list.component';
import { AdminGuard } from '../Services/admin.guard';

// Servicios
import { UserService } from '../Services/user.service';
import { AnimalService } from '../Services/animal.service';
import { UploadService } from '../Services/upload.service';

// Pipes...
import { SearchPipe } from './Pipes/search.pipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule,
    AdeminRoutingModule,
    BrowserAnimationsModule
  ],
  declarations: [MainComponent, AddComponent, EditComponent, ListComponent, SearchPipe],
  exports: [MainComponent, AddComponent, EditComponent, ListComponent],
  providers: [AdminGuard, UserService, AnimalService, UploadService]
})
export class AdminModule { }

