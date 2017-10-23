import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Movie } from './movie';

@Injectable()
export class ComponentService {
  movieUrl = "http://localhost:51829/api/Movie";
  constructor(private http: Http) {
}
  //Fetch all movies
  getAllMovies(): Observable<Movie[]> {
    return this.http.get(this.movieUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Add movie
  postMovie(Movie: Movie):Observable<Movie>{
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.post(this.movieUrl,Movie)
      .map(this.extractData)
      .catch(this.handleError);

  }

  //Fetch movie by title
  getMovieByTitle(title: string): Observable<Movie> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.get(this.movieUrl + "/" + title)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Delete movie
  deleteMovieById(movieId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.movieUrl + "/" + movieId)
      .map(success => success.status)
      .catch(this.handleError);
  }
  private extractData(res: Response) {
    let body = res.json();
    return body;
  }
  private handleError(error: Response | any) {
    console.error(error.message || error);
    return Observable.throw(error.status);
  }

}

