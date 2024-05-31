import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
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
import { getRemoteConfig, provideRemoteConfig } from '@angular/fire/remote-config';
import { getVertexAI, provideVertexAI } from '@angular/fire/vertexai-preview';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideFirebaseApp(() => initializeApp({
      "projectId":"zoologico-8e64a",
      "appId":"1:1025223233824:web:0fe21c91d5d8aa091c0745",
      "storageBucket":"zoologico-8e64a.appspot.com",
      "apiKey":"AIzaSyCpFxq-tSpKHjbVfBWhaY1mkBpCclWFDLU",
      "authDomain":"zoologico-8e64a.firebaseapp.com",
      "messagingSenderId":"1025223233824"})), 
      provideAuth(() => getAuth()), 
      provideAnalytics(() => getAnalytics()),
      provideFirestore(() => getFirestore()), 
      provideDatabase(() => getDatabase()), 
      provideFunctions(() => getFunctions()), 
      provideMessaging(() => getMessaging()), 
      providePerformance(() => getPerformance()), 
      provideStorage(() => getStorage()), 
      provideRemoteConfig(() => getRemoteConfig())],
  bootstrap: [AppComponent],
})
export class AppModule {}
