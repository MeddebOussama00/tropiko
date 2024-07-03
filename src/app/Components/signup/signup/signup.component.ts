import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  errorMessage:string='';
  constructor(private as:AuthService,private router: Router){
  }
  signup(data:any){
    let f: User = data.value;
    if (f.email && f.pass) {
      this.as.sign(f.email, f.pass).then(() => {
        this.as.addUser({email:f.email,password:f.pass,name:f.name,role:'user'});  
      this.router.navigate(['/login'])    
      }).catch((err) => this.errorMessage = err.message);
    } else {
       this.errorMessage ="Email or password is missing.";
    }}
}
