import { Component } from '@angular/core';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';

/**
 * Questo componente sarà responsabile della visualizzazione di
 * un elenco di prodotti, insieme ai pulsanti richiesti per
 * modificarli ed eliminarli o per creare un nuovo prodotto.
 */

@Component({
  templateUrl: 'productTable.component.html'
})
export class ProductTableComponent {

  constructor(private repository: ProductRepository) { }

  getProducts(): Product[] {
    return this.repository.getProducts();
  }

  deleteProduct(id: number) {
    this.repository.deleteProduct(id);
  }

}
