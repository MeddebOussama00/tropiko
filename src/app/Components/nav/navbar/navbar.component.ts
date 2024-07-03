import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { GoodsService } from '../../services/goods.service';
import { AuthService } from '../../services/auth.service';
import { goods } from '../../interfaces/goods.interface';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  id: string = '';
  open: boolean = false;
  g: goods[] = [];

  constructor(
    private ag: GoodsService,
    private as: AuthService,
    private rt: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      const t = sessionStorage.getItem('id');
      if (t) {
        this.id = t;
      }

      this.g = JSON.parse(sessionStorage.getItem('cart') || '[]');

      if (this.id) {
        this.open = true;
        this.TotalPrice();
      }
    }

    this.as.user$.subscribe((user) => {
      if (user) {
        this.as.setId(user.uid);
        this.open = true;
        this.id = this.as.getId();

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('id', this.id);
        }

        if (this.id) {
          this.ag.getCartUser(this.id).subscribe((data) => {
            this.g = data.map((t) => {
              const obj: any = t.payload.doc.data();
              return {
                id: t.payload.doc.id,
                name: obj.name,
                price: obj.price,
                imageUrl: obj.imageUrl,
                qt: obj.qt,
              };
            });

            if (isPlatformBrowser(this.platformId)) {
              sessionStorage.setItem('cart', JSON.stringify(this.g));
            }
          });
          this.TotalPrice();
        }
      }
    });
  }

  signout() {
    this.as.logout().then(() => {
      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.removeItem('id');
        sessionStorage.removeItem('cart');
      }
      this.g = [];
      this.open = false;
      this.rt.navigate(['/login']);
    });
  }

  pluscart(d: goods) {
    if (d.qt) {
      d.qt = d.qt + 1;

      this.ag.updateCart(this.id, d.id, { qt: d.qt });

      if (isPlatformBrowser(this.platformId)) {
        sessionStorage.setItem('cart', JSON.stringify(this.g));
      }
    }
  }

  CURRENCY_FORMATTER = new Intl.NumberFormat(undefined, {
    currency: 'USD',
    style: 'currency',
  });

  FormatPrice = (d: any) => {
    if (d) {
      const nb = Number(d.qt) * Number(d.price);
      return this.CURRENCY_FORMATTER.format(nb);
    }
    return;
  };

  TotalPrice(): string {
    let r: number = 0;
    this.g.forEach((d) => {
      if (d) {
        r += Number(d.qt) * Number(d.price);
      }
    });
    return this.CURRENCY_FORMATTER.format(r);
  }

  minuscart(d: goods) {
    if (d.qt && d.qt > 0) {
      d.qt -= 1;
      if (d.qt === 0) {
        this.g = this.g.filter((t) => t !== d);
        this.ag.removeCart(this.id, d.id);

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('cart', JSON.stringify(this.g));
        }
      } else {
        this.ag.updateCart(this.id, d.id, { qt: d.qt });

        if (isPlatformBrowser(this.platformId)) {
          sessionStorage.setItem('cart', JSON.stringify(this.g));
        }
      }
    }
  }
}