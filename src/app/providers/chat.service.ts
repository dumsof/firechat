import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';


@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];
  public usuario: any = {};

  constructor(private afs: AngularFirestore, public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      console.log('estado del usuario', user);
      if (!user) {
        return;
      }
      this.usuario.nombre = user.displayName;
      this.usuario.uid = user.uid;
    });
  }

  login(proveedor: string) {
    if (proveedor === 'google') {
      this.afAuth.auth.signInWithPopup(new auth.GoogleAuthProvider());
    } else if (proveedor === 'twitter') {
      this.afAuth.auth.signInWithPopup(new auth.TwitterAuthProvider());
    }
  }

  logout() {
    this.usuario = {};
    this.afAuth.auth.signOut();
    console.log('Salio Logueo');
  }

  cargarMensajes() {

    this.itemsCollection = this.afs.collection<Mensaje>('chats', refe => refe.orderBy('fecha', 'desc')
      .limit(5));
    return this.itemsCollection
      .valueChanges()
      .pipe(
        map((mensajes: Mensaje[]) => {
          /*  mostrar ordenado los ultimos 5 mensajes de la colección*/
          this.chats = [];
          mensajes.forEach(mensaje => {
            this.chats.unshift(mensaje);
          });

          return this.chats;
        })
      );
  }
  agregarMensaje(texto: string) {
    let mensaje = {
      nombre: this.usuario.nombre,
      mensajes: texto,
      fecha: new Date().getTime(),
      uid: this.usuario.uid
    };

    return this.itemsCollection.add(mensaje);
  }
}
