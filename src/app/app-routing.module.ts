import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardMainComponent } from './admin-dashboard/admin-dashboard-main/admin-dashboard-main.component';
import { RegisterEmployeesComponent } from './admin-dashboard/Employees/register-employees/register-employees.component';
import { ViewEmployeesComponent } from './admin-dashboard/Employees/view-employees/view-employees.component';
import { CategoryComponent } from './category/category.component';

import { ListProductsComponent } from './list-products/list-products.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { ProviderComponent } from './provider/provider.component';
import { RegisterComponent } from './register/register.component';
import { RequisitionComponent } from './requisition/requisition.component';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { Sidebar2Component } from './sidebar2/sidebar2.component';
import { ViewemployeeComponent } from './viewemployee/viewemployee.component';
import { EmailComponent } from './email/email.component';
import { TwofactorComponent } from './twofactor/twofactor.component';
import { EvenementComponent } from './ComponentsEvent/Evenement/evenement.component';
import { OrganisateurComponent } from './ComponentsEvent/organisateur/organisateur.component';
import { OrganisationComponent } from './ComponentsEvent/organisation/organisation.component';
import { Sidebar3Component } from './sidebar3/sidebar3/sidebar3.component';
import { CalendarComponent } from './ComponentsEvent/calendar/calendar.component';
import { ViewprovidersComponent } from './viewproviders/viewproviders.component';
import { RegisterLoginComponent } from './ComponentsEvent/register-login/register-login.component';
import { LoginRegisterComponent } from './ComponentsEvent/login-register/login-register.component';

const routes: Routes = [
  {path:'admin-dashboard',component:AdminDashboardMainComponent,children:[
    {path:'register-employees',component:RegisterEmployeesComponent},
    {path:'view-employees',component:ViewEmployeesComponent}
  ]},
  {path:'',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'products',component:ListProductsComponent},
  {path:'product',component:ProductComponent},
  {path:'providers',component:ProviderComponent},
  {path:'category',component:CategoryComponent},
  {path:'requisition', component:RequisitionComponent},
  {path:'header', component:HeaderComponent},
  {path:'sidebar', component:SidebarComponent},
  {path:'sidebar2' , component:Sidebar2Component},
  {path:'viewemployee' , component:ViewemployeeComponent},
  {path:'emailsend', component:EmailComponent},
  {path:'twofactor', component:TwofactorComponent},
  {path:'evenement', component:EvenementComponent},
  {path:'organisateur', component:OrganisateurComponent},
  {path:'organisation', component:OrganisationComponent},
  {path:'sidebar3', component:Sidebar3Component},
  {path:'calendar', component:CalendarComponent},
  {path:'viewprovider', component:ViewprovidersComponent},
  {path:'registerlogin', component:RegisterLoginComponent},
  {path:'loginregister', component:LoginRegisterComponent}




];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

 }
