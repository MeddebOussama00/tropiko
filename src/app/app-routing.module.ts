import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home/home.component';
import { LoginComponent } from './Components/login/login/login.component';
import { SignupComponent } from './Components/signup/signup/signup.component';
import { FruitComponent } from './Components/fruits/fruit/fruit.component';
import { FogetPasswordComponent } from './Components/foget-password/foget-password.component';
import { ContactComponent } from './Components/contact/contact.component';
import { AdminguardService } from './Components/services/adminguard.service';
import { UserguardService } from './Components/services/userguard.service';
const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'login',component:LoginComponent,canActivate: [UserguardService]},
  {path:'register',component:SignupComponent,canActivate: [UserguardService]},
  {path:'fruits',component:FruitComponent},
  {
    path: 'admin',
    loadChildren: () => import('./Components/dashboard/admin/admin-routing.module').then(m => m.AdminRoutingModule),
    canActivate: [AdminguardService]
  },
  {path:'ForgetPassword',component:FogetPasswordComponent},
  {path:'contact',component:ContactComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
