import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { ComponentService } from './component.service';
import { Movie} from './movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  //Component properties
  allMovies: Movie[];
  statusCode: number;
  requestProcessing = false;
  movieIdToUpdate = null;
  processValidation = false;

  //Create form
  movieForm = new FormGroup({
    title: new FormControl('', Validators.required)
  });
  //Create constructor to get service instance
  constructor(private movieService: ComponentService) {
  }
  //Create ngOnInit() and and load articles
  ngOnInit(): void {
    this.getAllMovies();
  }
  //Fetch all articles
  getAllMovies() {
    this.movieService.getAllMovies()
      .subscribe(
      data => this.allMovies = data,
      errorCode => this.statusCode = errorCode);
  }
}