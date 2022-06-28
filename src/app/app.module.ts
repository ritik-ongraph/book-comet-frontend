import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormComponent } from './forms/login-form/login-form.component';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from './interceptor/token-interceptor.service';
import { MaterialModule } from './material/material.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AddBooksComponent } from './forms/add-books/add-books.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AllBooksComponent } from './all-books/all-books.component';
import { BookInventoryComponent } from './dialog/book-inventory/book-inventory.component';
import { SummaryComponent } from './dialog/summary/summary.component';
import { ConfirmModalComponent } from './dialog/confirm-modal/confirm-modal.component';
import { SearchBooksComponent } from './search-books/search-books.component';
import { AuthenticationGuard } from './gaurds/authentication.guard';
@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    HeaderComponent,
    FooterComponent,
    AddBooksComponent,
    NotFoundComponent,
    AllBooksComponent,
    BookInventoryComponent,
    SummaryComponent,
    ConfirmModalComponent,
    SearchBooksComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [AuthenticationGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
