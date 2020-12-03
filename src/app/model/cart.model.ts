import { Injectable } from '@angular/core';
import { Product } from './product.model';

/**
 * Le singole selezioni di prodotti sono rappresentate come un array di
 * oggetti CartLine, ognuno dei quali contiene un oggetto Prodotto e una quantità.
 */
export class CartLine {

  constructor(public product: Product,
              public quantity: number) {}

  get lineTotal() {
    return this.quantity * this.product.price;
  }
}

/**
 * La classe Carrello tiene traccia del numero totale di articoli che sono stati
 * selezionati e il loro costo totale.
 */
@Injectable()
export class Cart {

  public lines: CartLine[] = [];
  public itemCount = 0;
  public cartPrice = 0;

  addLine(product: Product, quantity: number = 1) {
    // tslint:disable-next-line: no-shadowed-variable
    const line = this.lines.find(line => line.product.id === product.id);
    if (line !== undefined) {
      line.quantity += quantity;
    } else {
      this.lines.push(new CartLine(product, quantity));
    }
    this.recalculate();
  }

  updateQuantity(product: Product, quantity: number) {
    // tslint:disable-next-line: no-shadowed-variable
    const line = this.lines.find(line => line.product.id === product.id);
    if (line !== undefined) {
      line.quantity = Number(quantity);
    }
    this.recalculate();
  }

  removeLine(id: number) {
    const index = this.lines.findIndex(line => line.product.id === id);
    this.lines.splice(index, 1);
    this.recalculate();
  }

  clear() {
    this.lines = [];
    this.itemCount = 0;
    this.cartPrice = 0;
  }

  private recalculate() {
    this.itemCount = 0;
    this.cartPrice = 0;
    this.lines.forEach(l => {
      this.itemCount += l.quantity;
      this.cartPrice += (l.quantity * l.product.price);
    });
  }
}
