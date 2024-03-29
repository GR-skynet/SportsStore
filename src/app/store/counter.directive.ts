import { OnChanges } from '@angular/core';
import {
 Directive, ViewContainerRef, TemplateRef, Input, Attribute, SimpleChanges
} from '@angular/core';


class CounterDirectiveContext {
  constructor(public $implicit: any) { }
}

@Directive({
 // tslint:disable-next-line: directive-selector
 selector: '[counterOf]'
})
export class CounterDirective implements OnChanges {

  constructor(private container: ViewContainerRef,
              private template: TemplateRef<any>) {
  }

  @Input('counterOf')
  counter: number;

  ngOnChanges(changes: SimpleChanges) {
    this.container.clear();
    for (let i = 0; i < this.counter; i++) {
      this.container.createEmbeddedView(this.template,
      new CounterDirectiveContext(i + 1));
  }
 }
}


