import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxsModule } from '@ngxs/store';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CommandPanelComponent } from './command-panel/command-panel.component';
import { DisplayPanelComponent } from './display-panel/display-panel.component';
import { VendingState } from 'src/store/vending.state';
import { VendingFacadeService } from './services/vending-facade.service';
import { DenominationsService } from './services/denominations.service';

@NgModule({
    declarations: [AppComponent, CommandPanelComponent, DisplayPanelComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        NgxsModule.forRoot([VendingState]),
        NgxsLoggerPluginModule.forRoot(),
    ],
    providers: [VendingFacadeService, DenominationsService],
    bootstrap: [AppComponent],
})
export class AppModule {}
