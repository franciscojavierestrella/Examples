import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MindundisloyaltySharedModule } from 'app/shared/shared.module';
import { MindundisloyaltyCoreModule } from 'app/core/core.module';
import { MindundisloyaltyAppRoutingModule } from './app-routing.module';
import { MindundisloyaltyHomeModule } from './home/home.module';
import { MindundisloyaltyEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { JhiMainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { MindundisloyaltyAccountModule } from './account/account.module';

@NgModule({
  imports: [
    BrowserModule,
    MindundisloyaltySharedModule,
    MindundisloyaltyCoreModule,
    MindundisloyaltyHomeModule,
    MindundisloyaltyAccountModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MindundisloyaltyEntityModule,
    MindundisloyaltyAppRoutingModule
  ],
  declarations: [JhiMainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [JhiMainComponent]
})
export class MindundisloyaltyAppModule {}
