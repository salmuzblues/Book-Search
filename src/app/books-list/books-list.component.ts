import {Component, Input, OnInit} from '@angular/core';
import {Book} from '../Classes/book';

@Component({
  selector: 'books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.css']
})
export class BooksListComponent implements OnInit {

  @Input() books: Book[] = [];

  constructor() { }

  ngOnInit() {
  }

}
