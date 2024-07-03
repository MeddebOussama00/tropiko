import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { GoodsService } from '../../services/goods.service';
import { goods } from '../../interfaces/goods.interface';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-updated-cart',
  templateUrl: './updated-cart.component.html',
  styleUrl: './updated-cart.component.css'
})
export class UpdatedCartComponent  implements OnInit {
  myform!: FormGroup;
  g:any[]=[]
  message='';
  constructor(private ag:GoodsService,private tos:ToastrService) { }

  ngOnInit(): void {
    this.myform = new FormGroup({
      cart: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required)
    });
  }
  onSubmit(): void {
    if (this.myform.valid) {
      this.ag.getSpCart(this.myform.value.cart).subscribe((data) => {
        const exist = (data.find((doc: any) => doc.payload.doc.data().name == this.myform.value.cart))?.payload.doc.data();
        if (exist) {
          this.ag.updateSpCart({
            ...exist,
            price: this.myform.value.price, 
            qt: 1,
          });
        } else {
          this.message = 'Cart Not Found';
        }
      });
    }
  }
}
