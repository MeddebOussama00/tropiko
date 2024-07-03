import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { User } from '../../interfaces/User.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  errorMessage: string = '';
  id:string=''
  constructor(private as: AuthService, private router: Router) {}

  async loginUser(f: any) {
    let d: User = f.value;
    if (d.email && d.pass) {
      const userId = await this.as.login(d.email, d.pass);
      if (userId) {
        this.as.setId(userId);
        this.id = this.as.getId();
        this.as.setRoleUser(userId);
        this.router.navigate(['/']);

      } else {
        this.errorMessage = "Login failed";
      }
    } else {
      this.errorMessage = "Email or password is missing.";
    }
  }
}