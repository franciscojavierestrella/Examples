import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './Components/main/main.component';
import { AddComponent } from './Components/add/add.component';
import { EditComponent } from './Components/edit/edit.component';
import { ListComponent } from './Components/list/list.component';
import { AdminGuard } from '../Services/admin.guard';

const adminRoutes: Routes = [
    {path: 'admin-panel',
        component: MainComponent,
        canActivate: [AdminGuard],
        children: [
            {path: '', redirectTo: 'listado', pathMatch: 'full'},
            {path: 'listado', component: ListComponent},
            {path: 'crear', component: AddComponent},
            {path: 'editar/:id', component: EditComponent}
        ]
    }
];


@NgModule({
    imports: [ RouterModule.forChild(adminRoutes) ],
    exports: [RouterModule]
})

export class AdeminRoutingModule {}

