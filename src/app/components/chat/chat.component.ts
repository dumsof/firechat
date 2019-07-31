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
  }
}
