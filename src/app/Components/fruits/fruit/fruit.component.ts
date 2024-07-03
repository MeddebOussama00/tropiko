import { Component, OnInit } from '@angular/core';
import { goods } from '../../interfaces/goods.interface';
import { GoodsService } from '../../services/goods.service';
//import FormatPrice from '../../../FomatPrice';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-fruit',
  templateUrl: './fruit.component.html',
  styleUrl: './fruit.component.css'
})
export class FruitComponent implements OnInit {
  g: goods[] = [];
    id:string=''
  constructor(private ag: GoodsService,private as:AuthService) {}

  ngOnInit(): void {
    this.ag.getAll().subscribe(data => {
      this.g = data.map(d => {
        const obj: any = d.payload.doc.data();
        return {
          id: d.payload.doc.id,
          name: obj.name,
          price: obj.price,
          imageUrl: obj.imageUrl,
          qt:obj.qt};
      });
    });
    this.id =this.as.getId();
  }
   CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: "USD",
    style: "currency",
  });
  
  FormatPrice = (nb:number | undefined) => {
    if(nb){ return this.CURRENCY_FORMATTER.format(nb);}
    return 
  };
  
  buy(d: goods) {
    const obj  = { name: d.name, price: d.price,imageUrl:d.imageUrl ,qt: 1 };
      this.ag.addCart(obj,this.id);
    }
  
}