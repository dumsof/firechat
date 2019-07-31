import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Mensaje } from '../interface/mensaje.interface';
import { map } from 'rxjs/operators';


@Injectable()
export class ChatService {

  private itemsCollection: AngularFirestoreCollection<Mensaje>;
  public chats: Mensaje[] = [];

  constructor(private afs: AngularFirestore) {
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
      nombre: 'Demo',
      mensajes: texto,
      fecha: new Date().getTime()
    };

    return this.itemsCollection.add(mensaje);
  }
}
