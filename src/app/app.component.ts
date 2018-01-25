import { Component } from '@angular/core';
import {BookStoreService} from './Services/book-store.service';
import {Book} from './Classes/book';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BookStoreService]

})
export class AppComponent {

  // var obeject Book
  filteredBooks: Book[];

  constructor(private bookStoreService: BookStoreService) {}

  searchBook( title: string) {
   this.bookStoreService.getBooks(title).subscribe(books => this.filteredBooks = books);
  }
}
