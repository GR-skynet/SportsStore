import { Component } from '@angular/core';
import { Cart } from '../model/cart.model';
import { ConnectionService } from '../model/connection.service';
@Component({
 templateUrl: 'cartDetail.component.html'
})
export class CartDetailComponent {

  // constructor(public cart: Cart) { }

  /* Per impedire all'utente di effettuare il check-out in assenza di connessione,
   * aggiorno i dettagli del carrello in modo che riceva il servizio di connessione
   * nel suo costruttore.
   */

  public connected = true;

  constructor(public cart: Cart,
              private connection: ConnectionService) {
    this.connected = this.connection.connected;
    connection.Changes.subscribe((state) => this.connected = state);
  }

}
