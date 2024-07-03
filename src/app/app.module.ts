
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './Components/nav/navbar/navbar.component';
import { HomeComponent } from './Components/home/home/home.component';
import { LoginComponent } from './Components/login/login/login.component';
import { SignupComponent } from './Components/signup/signup/signup.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getAnalytics, provideAnalytics, ScreenTrackingService, UserTrackingService } from '@angular/fire/analytics';
import { initializeAppCheck, ReCaptchaEnterpriseProvider, provideAppCheck } from '@angular/fire/app-check';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFunctions, provideFunctions } from '@angular/fire/functions';
import { getMessaging, provideMessaging } from '@angular/fire/messaging';
import { getPerformance, providePerformance } from '@angular/fire/performance';
import { getStorage, provideStorage } from '@angular/fire/storage';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';
import { FooterComponent } from './Components/footer/footer/footer.component';
import { FruitComponent } from './Components/fruits/fruit/fruit.component';
import { ToastrModule, ToastNoAnimation, ToastNoAnimationModule } from 'ngx-toastr';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { UpdatedCartComponent } from './Components/dashboard/updated-cart/updated-cart.component';
import { AddCartComponent } from './Components/dashboard/add-cart/add-cart.component';
import { FogetPasswordComponent } from './Components/foget-password/foget-password.component';
import { ContactComponent } from './Components/contact/contact.component';
import {environment} from '../environments/environment'
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    FruitComponent,
    DashboardComponent,
    UpdatedCartComponent,
    AddCartComponent,
    FogetPasswordComponent,
    ContactComponent,

  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    ToastNoAnimationModule.forRoot(),
    AngularFireModule.initializeApp({
       apiKey: environment.API_KEY,
        authDomain: environment.AUTH_DOMAIN,
        projectId: environment.PROJECT_ID,
        storageBucket: environment.STORAGE_BUCKET,
        messagingSenderId: environment.MESSAGING_SENDER_ID,
        appId: environment.APP_ID,
        measurementId: environment.MEASUREMENT_ID
    }),
    AngularFirestoreModule,
  ],
  providers: [
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp({
      projectId: (environment as any).PROJECT_ID,
      appId: (environment as any).APP_ID,
      storageBucket: (environment as any).STORAGE_BUCKET,
      apiKey: (environment as any).API_KEY,
      authDomain: (environment as any).AUTH_DOMAIN,
      messagingSenderId: (environment as any).MESSAGING_SENDER_ID,
      measurementId: (environment as any).MEASUREMENT_ID,
    })),
    provideAuth(() => getAuth()),
    provideAnalytics(() => getAnalytics()),
    ScreenTrackingService,
    UserTrackingService,
    /*provideAppCheck(() => {
      // TODO get a reCAPTCHA Enterprise here https://console.cloud.google.com/security/recaptcha?project=_
      const provider = new ReCaptchaEnterpriseProvider(/* reCAPTCHA Enterprise site key /);
      return initializeAppCheck(undefined, { provider, isTokenAutoRefreshEnabled: true });
    }),*/
    provideFirestore(() => getFirestore()),
    provideDatabase(() => getDatabase()),
    provideFunctions(() => getFunctions()),
    provideMessaging(() => getMessaging()),
    providePerformance(() => getPerformance()),
    provideStorage(() => getStorage()),
    provideVertexAI(() => getVertexAI())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }