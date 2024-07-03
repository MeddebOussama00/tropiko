import { Injectable,OnInit} from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { goods } from '../interfaces/goods.interface';
import { ToastrService } from 'ngx-toastr';



@Injectable({
  providedIn: 'root'
})
export class GoodsService  implements OnInit {
  ug:goods[]=[];
  constructor(private fb: AngularFirestore,private as:AuthService,private tos:ToastrService,private storage:AngularFireStorage) { 
}
  ngOnInit(): void {
  }
  getAll() {
    return this.fb.collection('goods').snapshotChanges();
  }
  addCart(f:any,id:string){
    this.fb.collection(`users/${id}/cart`).add(f);
  }
  getCartUser(id:string){
   return this.fb.collection(`users/${id}/cart`).snapshotChanges();
  }


  removeCart(iduser: string, id: any) {
    try {
      this.fb.collection(`users`).doc(iduser).collection('cart').doc(id).delete()
        .then(() => console.log(`Cart item ${id} removed for user ${iduser}`))
        .catch((error) => console.error(`Error removing cart item: ${error}`));
    } catch (error) {
      console.error(`Error removing cart item: ${error}`);
    }
  }
  
  updateCart(iduser: string, id: any, v: any) {
    this.fb.collection(`users`).doc(iduser).collection('cart').doc(id).update(v)
  }


  getSpCart(name: string) {
    return this.fb.collection('goods', ref => ref.where('name', '==', name))
     .snapshotChanges()

  }
  private updatingCart = false;
  updateSpCart(d: any) {
    if (this.updatingCart) return; 
    this.updatingCart = true;
    const goods = this.fb.collection('goods');
    const q = goods.ref.where('name', '==', d.name);
    q.get().then((docSnapshot)  => {
      if (docSnapshot.docs.length > 0) {
        const docRef = docSnapshot.docs[0].ref;
        docRef.update(d).then(() => {
          this.tos.success('Cart Updated', 'Success');
          this.updatingCart = true; 
        }).catch(() => {
          this.updatingCart = false; 
        });
      } else {
        console.log('No document found');
      }
    }).catch(() => {
      this.updatingCart = false; 
    });
  }
  addNewCart(cart: string, price: number, img: File) {
    const storageRef = this.storage.ref('/goods/' + img.name);
    storageRef.put(img).then(() => {
      storageRef.getDownloadURL().toPromise().then((url) => {
        const imageUrl = url; 
        this.fb.collection('goods').add({ name: cart, price, imageUrl: imageUrl }).then(() => {
          this.tos.success('Cart Added', 'Success');
        })
      })
    })
  }
}

