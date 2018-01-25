import {Component, ElementRef, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';
import {BookStoreService} from '../Services/book-store.service';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';
@Component({
  selector: 'book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {

  // The ViewChild decorator is used to gain access to a child component,
  // found in the template, so that you can access its properties and methods.
  // var
  @ViewChild('searchInput') searchInput;
  @ViewChild('suggestions') suggestions;
  bookTitles: Array<string> = [];
  searchInputTerm: string = '';
  // create a property variable of output
  @Output() search = new EventEmitter<string>();
  // constructor
  constructor(private bookStoreService: BookStoreService) {
  }


  ngOnInit() {
    // .map() => Apply projection with each value from source.
    // fromEvent => Turn event into observable sequence.
    /*
    ----- FIRST CODE ----
    En el método subscribe(), estamos llamando al método getBookTitles() y al texto que
    que se ingresa en el cuadro de búsqueda, que nuevamente arroja los resultados del Observable
    título del libro.
    Note: Estamos utilizando subscribe() dentro de otro método subscribe()
   de nuevo, es similar a las devoluciones de llamada anidadas. No deberíamos escribir el código de
    esta manera usando RxJS. esto es en el primer codigo, el codigo de abajo ya esta correjido.
    / KeyboardEvent objects describe a user interaction with the keyboard. Each event describes a key;
    the event type (keydown, keypress, or keyup) identifies what kind of activity was performed. /
    ---CODE--
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup').map((event: KeyboardEvent) =>
      (<HTMLInputElement>event.target).value).subscribe(title => this.bookStoreService.getBookTitles(title)
      .subscribe(bookTitles => this.bookTitles = bookTitles));
     */
    /*
    ----- SECOND CODE -----
    // el operador mergeMap(); toma el valor fuente de la entrada
    // Observable y produce una salida plana Observable
    // mergeMap => Map to observable, emit values. allows for multiple inner subscriptions to be active at a time.
    --- CODE --
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup').map((event: KeyboardEvent) =>
      (<HTMLInputElement>event.target).value).mergeMap(title => this.bookStoreService.getBookTitles(title))
      .subscribe(bookTiles => this.bookTitles = bookTiles);
      */
    // THIRD CODE BETTER
    /*
    / KeyboardEvent objects describe a user interaction with the keyboard. Each event describes a key;
    the event type (keydown, keypress, or keyup) identifies what kind of activity was performed. /
    El operador debounceTime(400) espera 400 ms después de cada pulsación de tecla antes
    de considerar el término de búsqueda, el operador distinctUntilChanged() lo ignora si
    el siguiente término de búsqueda es el mismo que el anterior.
    switchMap() en lugar del operador mergeMap(); cambia a un nuevo Observable
    cada vez que cambia el término de búsqueda.
    * The target event property returns the element that triggered the event.
    * HTMLInputElement allows the web page to recieve many types of input from the user.
    Use the type property to configure what type of input you want to get.
    * Event.srcElement is a proprietary alias for the standard Event.target property.
      It is specific to old versions of Microsoft Internet Explorer.
    * The innerText property can be used to write the dynamic text on the html document.
      Here, text will not be interpreted as html text but a normal text
    */
    // this is for searching
    Observable.fromEvent(this.searchInput.nativeElement, 'keyup')
      .debounceTime(400)
      .distinctUntilChanged()
      .map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
      .switchMap(title => this.bookStoreService.getBookTitles(title))
      .subscribe(bookTiles => this.bookTitles = bookTiles);
    // this is for suggestion
    Observable.fromEvent(this.suggestions.nativeElement, 'click')
      .map((event: KeyboardEvent) => (<HTMLInputElement>event.srcElement).innerText)
      .subscribe(res => {
        this.searchInputTerm = res;
        this.bookTitles  = [];
        });
  }

  searchBooks() {
    this.bookTitles = [];
    this.search.emit(this.searchInputTerm);
  }


}
