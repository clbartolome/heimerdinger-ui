import { NgModule, APP_INITIALIZER, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppConfigService } from './providers/app-config.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerListComponent } from './components/servers-list/servers-list.component';
import { TableDialog } from './components/servers-list/servers-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatSliderModule } from '@angular/material/slider';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ServerDetailComponent } from './components/server-detail/server-detail.component';
import { LoginComponent } from './components/login/login.component';


export function initConfig(appConfig: AppConfigService) {
  return () => appConfig.loadConfig();
}

@NgModule({
  declarations: [
    AppComponent,
    ServerListComponent,
    TableDialog,
    ServerDetailComponent,
    LoginComponent
  ],
  imports: [
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatDialogModule,
    MatGridListModule,
    MatProgressSpinnerModule,
    MatCardModule  
  ],
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initConfig,
    deps: [AppConfigService],
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
