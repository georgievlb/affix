import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { RenderHtmlPipe } from './pipes/render-html.pipe';
import { NavMenuComponent } from './components/nav-menu/nav-menu.component';
import { MainContentComponent } from './components/main-content/main-content.component';
import { FooterComponent } from './components/footer/footer.component';
import { ViewPostCardComponent } from './domain/post/view-post-card/view-post-card.component';

@NgModule({
  declarations: [
    AppComponent,
    RenderHtmlPipe,
    NavMenuComponent,
    MainContentComponent,
    FooterComponent,
    ViewPostCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
