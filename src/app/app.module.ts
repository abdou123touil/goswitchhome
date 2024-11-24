import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule,withFetch ,provideHttpClient } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './components/auth/auth.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { AddHousesComponent } from './components/add-house/add-house.component';
import { HomeComponent } from './components/home/home.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth/auth.service';
import { AddHouseService } from './services/add-house/add-house.service';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    AddHousesComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    FooterComponent,
    ReactiveFormsModule,
    AppRoutingModule,
    RouterModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [AuthService,AddHouseService,
    provideHttpClient(withFetch()),
    provideClientHydration(withEventReplay())
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
