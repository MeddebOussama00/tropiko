import { Component,OnInit} from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-foget-password',
  templateUrl: './foget-password.component.html',
  styleUrl: './foget-password.component.css'
})
export class FogetPasswordComponent implements OnInit {
  mess :string=''
  er:string=''
  constructor(private as:AuthService){}
  ngOnInit(): void {}

  resetPass(f: any) {
    const em: string = f.value.email;
    this.as.resetPassword(em).then(() => {
      this.mess = "check your email";
    }).catch((er) => {
      this.er = er.message;
    });
  }
  
}
