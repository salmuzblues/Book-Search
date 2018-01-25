import { BrowserModule } from '@angular/platform-browser';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { BookSearchComponent } from './book-search/book-search.component';
import { BooksListComponent } from './books-list/books-list.component';
import {BookStoreService} from './Services/book-store.service';



@NgModule({
  declarations: [
    AppComponent,
    BookSearchComponent,
    BooksListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [BookStoreService],
  bootstrap: [AppComponent]
})
export class AppModule { }
