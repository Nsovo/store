import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import { Book } from './book';

@Injectable()
export class ComponentService {
  bookUrl = "http://localhost:3000/book";
  constructor(private http: Http) {
}
  //Fetch all books
  getAllBooks(): Observable<Book[]> {
    return this.http.get(this.bookUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Fetch book by id
  getArticleById(bookId: string): Observable<Book> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    console.log(this.bookUrl + "/" + bookId);
    return this.http.get(this.bookUrl + "/" + bookId)
      .map(this.extractData)
      .catch(this.handleError);
  }

  //Delete book	
  deleteArticleById(bookId: string): Observable<number> {
    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
    let options = new RequestOptions({ headers: cpHeaders });
    return this.http.delete(this.bookUrl + "/" + bookId)
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

