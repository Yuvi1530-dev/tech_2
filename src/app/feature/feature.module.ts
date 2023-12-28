import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FeatureRoutingModule } from './feature-routing.module';
import { FooterComponent } from '../_layout/footer/footer.component';
import { HeaderComponent } from '../_layout/header/header.component';
import { ContactComponent } from './contact/contact.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { MoveListComponent } from './move-list/move-list.component';
import { RigisterComponent } from './rigister/rigister.component';
import { CoreModule } from '../core/core.module';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    LoginComponent,
    RigisterComponent,
    MoveListComponent,
    ContactComponent,
    DashboardComponent,
  ],
  imports: [
    MatInputModule,
    MatIconModule,
    FormsModule, 
    ReactiveFormsModule,
    BrowserAnimationsModule,
    CommonModule,
    FeatureRoutingModule,
    CoreModule,
  
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA
  ],
})
export class FeatureModule { }
