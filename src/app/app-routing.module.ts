import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AddBooksComponent } from './forms/add-books/add-books.component';
import { FormComponent } from './forms/login-form/login-form.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
{ path: '', component: FormComponent },
{ path: 'dashboard', component: AllBooksComponent },
{ path: 'dashboard/add', component: AddBooksComponent },
{ path: 'dashboard/edit/:id', component: AddBooksComponent },
{ path:'**',component:NotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
