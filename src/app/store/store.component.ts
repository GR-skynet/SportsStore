import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cart } from '../model/cart.model';
import { Product } from '../model/product.model';
import { ProductRepository } from '../model/product.repository';

@Component({
 // tslint:disable-next-line: component-selector
 selector: 'store',
 templateUrl: 'store.component.html'
})
export class StoreComponent {

  public selectedCategory = null;
  public productsPerPage = 4;
  public selectedPage = 1;

   constructor( private repository: ProductRepository,
                private cart: Cart,
                private router: Router) { }

  get products(): Product[] {
    const pageIndex = (this.selectedPage - 1) * this.productsPerPage;
    return this.repository.getProducts(this.selectedCategory)
      .slice(pageIndex, pageIndex + this.productsPerPage);
    // return this.repository.getProducts((this.selectedCategory));
  }

  get categories(): string[] {
  return this.repository.getCategories();
  }

  changeCategory(newCategory?: string) {
    this.selectedCategory = newCategory;
  }

  changePage(newPage: number) {
    this.selectedPage = newPage;
  }
  changePageSize(newSize: number) {
    this.productsPerPage = Number(newSize);
    this.changePage(1);
  }

  // variante con l'uso della direttiva personalizzata
  get pageCount(): number {
    return Math.ceil(this.repository
      .getProducts(this.selectedCategory).length / this.productsPerPage);
  }

  /*
  get pageNumbers(): number[] {
    return Array(Math.ceil(this.repository
    .getProducts(this.selectedCategory).length / this.productsPerPage))
    .fill(0).map((x, i) => i + 1);
  }
  */

  /**
   * Aggiungo un prodotto al carrello
   */
  addProductToCart(product: Product) {
    this.cart.addLine(product);
    this.router.navigateByUrl('/cart');
  }

}
