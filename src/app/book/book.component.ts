import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { BookService } from './book.service';
import { Book } from './book';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {

  //Component properties
  allBooks: Book[];
  statusCode: number;
  requestProcessing = false;
  bookIdToUpdate = null;
  processValidation = false;

  //Create form
  bookForm = new FormGroup({
    title: new FormControl('', Validators.required),
    category: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(private bookService: BookService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllBooks();
  }
  //Fetch all articles
  getAllBooks() {
    this.bookService.getAllBooks()
      .subscribe(
      data => this.allBooks = data,
      errorCode => this.statusCode = errorCode);
  }

  //Load article by id to edit
  loadArticleToEdit(bookId: string) {
    this.preProcessConfigurations();
    this.bookService.getArticleById(bookId)
      .subscribe(book => {
        this.bookIdToUpdate = book.BookId;
        this.bookForm.setValue({ title: book.title, category: book.description });
        this.processValidation = true;
        this.requestProcessing = false;
      },
      errorCode => this.statusCode = errorCode);
  }

  //Perform preliminary processing configurations
  preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
  }


}
