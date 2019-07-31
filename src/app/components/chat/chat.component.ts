import { Component } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent {
  mensaje: string = '';
  constructor(public sevicioChat: ChatService) {
    this.sevicioChat.cargarMensajes().subscribe();
  }
  enviar_mensaje() {
    console.log(this.mensaje);
    if (this.mensaje.length === 0) {
      return;
    }
    this.sevicioChat.agregarMensaje(this.mensaje)
      .then(() => { this.mensaje = ''; console.log('Mensaje enviado con exito'); })
      .catch(error => console.log('Error al guardar :', error));
    /* el then se ejecuta cuando todo se realiza con exito 
      catch: se ejecuta cuando hay error*/
  }
}
