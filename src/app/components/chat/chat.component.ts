import { Component, OnInit } from '@angular/core';
import { ChatService } from '../../providers/chat.service';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styles: []
})
export class ChatComponent implements OnInit {
  mensaje: string = '';
  elemento: any;

  constructor(public sevicioChat: ChatService) {
    this.sevicioChat.cargarMensajes().subscribe(() => {
      setTimeout(() => {
        /* poder poner el foco al final del chat */
        this.elemento.scrollTop = this.elemento.scrollHeight;
      }, 20);

    });
  }

  ngOnInit() {
    this.elemento = document.getElementById('app-mensajes');
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
