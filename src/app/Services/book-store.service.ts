import { Injectable } from "@angular/core";
import  { BOOKS } from "../Classes/data-books";
import {Book} from '../Classes/book';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';

@Injectable() // emit metaData upon our service
export class BookStoreService {

  // create an object of class Book
  booksList: Book [] = BOOKS;

 /*  HERE WE ARE CREATING ALL THE METHODS with Observable that we can use */

  getBooks(title: string): Observable<Book[]> {
    return Observable.of(this.filterBooks(title));
  }
  getBookTitles(title: string): Observable<string[]> {
    return Observable.of(this.filterBooks(title).map(book => book.title));
  }
  filterBooks(title: string): Book[] {
    return title ?
      this.booksList.filter((book) => new RegExp(title, 'gi').test(book.title)) :
      [];
  }

}
