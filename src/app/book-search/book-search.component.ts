import {Component, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {BookStoreService} from '../Services/book-store.service';
import 'rxjs/add/operator/mergeMap';

@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  // constructor
  constructor(private bookStoreService: BookStoreService) {}
  // The ViewChild decorator is used to gain access to a child component,
  // found in the template, so that you can access its properties and methods.
  // var
  @ViewChild('searchInput') searchInput;
  bookTitles: Array<string>;

  ngOnInit() {
    // .map() => Apply projection with each value from source.
    // fromEvent => Turn event into observable sequence.
    /*En el método subscribe(), estamos llamando al método getBookTitles() y al texto que
    que se ingresa en el cuadro de búsqueda, que nuevamente arroja los resultados del Observable
    título del libro.
    Note: Estamos utilizando subscribe() dentro de otro método subscribe()
   de nuevo, es similar a las devoluciones de llamada anidadas. No deberíamos escribir el código de
    esta manera usando RxJS. esto es en el primer codigo, el codigo de abajo ya esta correjido
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup').map((event: KeyboardEvent) =>
      (<HTMLInputElement>event.target).value).subscribe(title => this.bookStoreService.getBookTitles(title)
      .subscribe(bookTitles => this.bookTitles = bookTitles));
     */
    // el operador mergeMap(); toma el valor fuente de la entrada
    // Observable y produce una salida plana Observable
    // mergeMap => Map to observable, emit values. allows for multiple inner subscriptions to be active at a time.
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup').map((event: KeyboardEvent) =>
      (<HTMLInputElement>event.target).value).mergeMap(title => this.bookStoreService.getBookTitles(title))
      .subscribe(bookTiles => this.bookTitles = bookTiles);
  }


}
