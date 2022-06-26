import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllBooksComponent } from './all-books/all-books.component';
import { AddBooksComponent } from './forms/add-books/add-books.component';
import { FormComponent } from './forms/login-form/login-form.component';
import { AnonGuard } from './gaurds/anon.guard';
import { AuthenticationGuard } from './gaurds/authentication.guard';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
{ path: '', component: FormComponent , canActivate:[AnonGuard] },
{ path: 'login', component: FormComponent ,canActivate:[AnonGuard]},
{ path: 'dashboard', component: AllBooksComponent , canActivate:[AuthenticationGuard]},
{ path: 'dashboard/add', component: AddBooksComponent,canActivate:[AuthenticationGuard] },
{ path: 'dashboard/edit/:id', component: AddBooksComponent,canActivate:[AuthenticationGuard] },
{ path:'**',component:NotFoundComponent
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
