import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

/* se importan los modulos para firebase, con el fin de crear el chat 
utilizando la base de datos de firebase */
import { AngularFireModule } from '@angular/fire';
import { environment } from '../environments/environment';


import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ChatComponent } from './components/chat/chat.component';

/*se debe importar para el manejo de ngModel*/
import { FormsModule } from '@angular/forms';
import { ChatService } from './providers/chat.service';
import { LoginComponent } from './components/login/login.component';


@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule, // imports firebase/storage only needed for storage features
    FormsModule
  ],
  providers: [ ChatService],
  bootstrap: [AppComponent]
})
export class AppModule { }
