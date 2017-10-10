import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ComponentService } from './component.service';
import { Book } from './book';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

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
  constructor(private bookService: ComponentService) {
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
}