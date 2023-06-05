import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { AppRoutingModule } from './app.routing';
import { PagesModule } from './pages/pages.module';
import { AuthModule } from './auth/auth.module';
//import { AuthModuleGeneral } from './core/auth/auth.module';
import { ComponentsModule } from './components/components.module';


// Components
import { AppComponent } from './app.component';
import { Error500Component } from './error/error-500/error-500.component';
import { Error404Component } from './error/error-404/error-404.component';




@NgModule({
  declarations: [
    AppComponent,
    Error500Component,
    Error404Component
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PagesModule,
    AuthModule,
    ComponentsModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
