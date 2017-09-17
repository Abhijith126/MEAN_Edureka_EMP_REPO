import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { EmployeesComponent } from './employees/employees.component';
import { RouterModule } from '@angular/router'
import { EmployeesService } from './employees.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const ROUTES = [
  {
    path: '',
    redirectTo: 'employees',
    pathMatch: 'full'
  },
  {
    path: 'employees',
    component: EmployeesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule, ReactiveFormsModule,
    RouterModule.forRoot(ROUTES)
  ],
  providers: [EmployeesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
