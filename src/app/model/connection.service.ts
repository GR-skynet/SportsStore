import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

/**
 * Servizio che fornisce i dettagli sullo stato della connettività dell'applicazione.
 * Tale servizio preseleziona lo stato della connessione al resto dell'applicazione,
 * ottenendo lo stato tramite la proprietà 'navigator.onLine' del browser e la risposta
 * agli eventi online e offline, che sono attivati quando lo stato della connessione cambia
 * e a cui si accede tramite il metodo 'addEventListener' fornito dal browser.
 */

@Injectable()
export class ConnectionService {

  private connEvents: Subject<boolean>;

  constructor() {
    this.connEvents = new Subject<boolean>();
    window.addEventListener('online',
      (e) => this.handleConnectionChange(e));
    window.addEventListener('offline',
      (e) => this.handleConnectionChange(e));
  }

  private handleConnectionChange(event) {
    this.connEvents.next(this.connected);
  }

  get connected(): boolean {
    return window.navigator.onLine;
  }

  get Changes(): Observable<boolean> {
    return this.connEvents;
  }

}
