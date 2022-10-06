import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { MessagesComponent } from './messages/messages.component';


import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { HeroesComponent } from './heroes/heroes.component';
import { HeroDetailComponent } from './hero-detail/hero-detail.component';
import { HeroSearchComponent } from './hero-search/hero-search.component';
import { EmployeeComponent } from './employee/employee.component';
import { EmployeeDetailComponent } from './employee-detail/employee-detail.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule, 
        TranslateModule,
        NgbDropdownModule,
        FormsModule,
        ReactiveFormsModule
    ],

    declarations: [
        LayoutComponent,
        SidebarComponent,
        HeaderComponent,

        HeroesComponent,
        HeroDetailComponent,
        MessagesComponent,
        HeroSearchComponent,
        EmployeeComponent,
        EmployeeDetailComponent,
        EmployeeSearchComponent,
]
})
export class LayoutModule {}
