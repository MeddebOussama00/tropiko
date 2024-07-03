import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { GoodsService } from '../../services/goods.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-cart',
  templateUrl: './add-cart.component.html',
  styleUrls: ['./add-cart.component.css']
})
export class AddCartComponent implements OnInit {

  @ViewChild('image') imageInput!: ElementRef;
  message: string = '';

  constructor(private dg: GoodsService, private tos: ToastrService) { }

  ngOnInit(): void {
  }

  addCart(form: NgForm) {
    if (form.valid) {
      const sf = this.imageInput.nativeElement.files[0];
      console.log("da5el")
      this.dg.getSpCart(form.value.cart).subscribe((data) => {
        const exist = (data.find((doc: any) => doc.payload.doc.data().name == form.value.cart))?.payload.doc.data();
        if (!exist && sf) {
          const cart: string = form.value.cart;
          const price: number = form.value.price;
          this.dg.addNewCart(cart, price, sf);
        } else {
          this.message = 'already exist';
        }
      });
    } else {
      this.message = 'Please fill in all fields';
    }
  }
}