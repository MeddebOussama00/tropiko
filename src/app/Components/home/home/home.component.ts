import { Component, OnInit } from '@angular/core';
import { GoodsService } from '../../services/goods.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private ag:GoodsService) {

  }



}
