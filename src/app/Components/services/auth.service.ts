import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Auth, createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, sendPasswordResetEmail, onAuthStateChanged, getIdToken, getAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';
import { from } from 'rxjs';
import { User } from '../interfaces/User.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<any>;
  private userId: string = '';
  private idToken: string | null = null;
  private refreshToken: string | null = null;
  private role$: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private auth: Auth, private firestore: AngularFirestore) {
    this.user$ = new Observable(subscriber => {
      onAuthStateChanged(this.auth, user => {
        subscriber.next(user);
      });
    });
  }

  logout = (): Promise<void> => {
    return signOut(this.auth).then(() => {
      localStorage.removeItem('idToken');
      localStorage.removeItem('refreshToken');
    });
  };

  resetPassword = (email: string): Promise<void> => {
    return sendPasswordResetEmail(this.auth, email);
  };

  async sign(email: string, password: string): Promise<string> {
    return createUserWithEmailAndPassword(this.auth, email, password)
     .then(async (userCredential) => { 
        this.idToken = await getIdToken(userCredential.user);
        this.refreshToken = userCredential.user.refreshToken;
        localStorage.setItem('idToken', this.idToken);
        localStorage.setItem('refreshToken', this.refreshToken);
        return userCredential.user.uid;
      });
  }
  
  async login(email: string, password: string): Promise<string> {
    try {
      const userCredential = await signInWithEmailAndPassword(this.auth, email, password);
      this.idToken = await getIdToken(userCredential.user);
      this.refreshToken = userCredential.user.refreshToken;
      localStorage.setItem('idToken', this.idToken);
      localStorage.setItem('refreshToken', this.refreshToken);
      return userCredential.user.uid;
    } catch (error) {
      console.error('Error logging in:', error);
      return '';
    }
  }

  setId(id: string) {
    this.userId = id;
  }

  getId(): string {
    return this.userId;
  }

  setRoleUser(id: string) {
    this.firestore.collection('users').doc(id).get().subscribe((doc) => {
      const userData = doc.data() as User;
      if (userData && userData.role) {
        this.role$.next(userData.role);
      }
    });
  }

  isAuthenticated(): Observable<boolean> {
    return this.role$.pipe(map(role => role === 'admin'));
  }

  addUser(data: any): Promise<any> {
    return this.firestore.doc('users/' + this.userId).set(data);
  }

  isLoggedIn(): boolean {
    return!!localStorage.getItem('idToken');
  }

  getIdToken(): string | null {
    return localStorage.getItem('idToken');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refreshToken');
  }
}