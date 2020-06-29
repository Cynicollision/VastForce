import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LayoutModule } from '@angular/cdk/layout';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Environment } from '../environments/environment';
import { ConfirmComponent } from './core/confirm/confirm.component';
import { ListComponent } from './core/list/list.component';
import { WaitSpinnerComponent } from './core/wait-spinner/wait-spinner.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { LoginComponent } from './login/login.component';
import { ProfileDetailComponent } from './pages/profile-detail/profile-detail.component';
import { ProfileListComponent } from './pages/profile-list/profile-list.component';
import { QueryPermissionsComponent } from './pages/query-permissions/query-permissions.component';
import { DataSourcesComponent } from './pages/data-sources/data-sources.component';
import { DataSourceAddComponent } from './pages/data-source-add/data-source-add.component';

@NgModule({
  declarations: [
    AppComponent,
    ConfirmComponent,
    ListComponent,
    WaitSpinnerComponent,
    HomeComponent,
    AboutComponent,
    CreateAccountComponent,
    LoginComponent,
    ProfileDetailComponent,
    ProfileListComponent,
    QueryPermissionsComponent,
    DataSourcesComponent,
    DataSourceAddComponent,
  ],
  entryComponents: [
    ConfirmComponent,
    CreateAccountComponent,
    WaitSpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    LayoutModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatDatepickerModule,
    MatDialogModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatNativeDateModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSnackBarModule,
    MatTableModule,
    MatProgressSpinnerModule,
    MatToolbarModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: Environment.production }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
