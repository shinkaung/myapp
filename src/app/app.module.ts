import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from './shared';
import { LanguageTranslationModule } from './shared/modules/language-translation/language-translation.module';
import { FormsModule } from '@angular/forms';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { DateInputsModule } from '@progress/kendo-angular-dateinputs';
import { GridModule } from '@progress/kendo-angular-grid';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { CommonModule } from '@angular/common';
import { UploadsModule } from '@progress/kendo-angular-upload';
import { HttpTokenInterceptor } from './core/interceptors/http.token.interceptor';
import { ModaldialogService } from './core/services/modaldialog.service';
import { PermissionGuardService } from './shared/guard/permission-guard.service';
@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        LanguageTranslationModule,
        AppRoutingModule,
        FormsModule,
        ButtonsModule,
        DateInputsModule,
        GridModule,
        DialogModule,
        DropDownsModule,
        UploadsModule
    ],
    declarations: [AppComponent,],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: HttpTokenInterceptor, multi: true },
        PermissionGuardService,
        ModaldialogService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}
