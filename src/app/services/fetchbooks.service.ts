import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class FetchbooksService {

  http:HttpClient;
  apiKey = 'AIzaSyAY6v5lqngICX9e9kaGgS-20m93Hsz3IEo'; // Replace with your API key
  

  constructor(http:HttpClient) {
    this.http = http;
  }

  getBooksByGenre(genre:string):Observable<any>{
    const randomIndex = Math.floor(Math.random() * 11);
    const url = `https://www.googleapis.com/books/v1/volumes?q=subject:${genre}&orderBy=relevance&startIndex=${randomIndex}&key=${this.apiKey}`;
    return this.http.get(url);
  }

  getBookByTitle(title:string):Observable<any>{
    let url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${title}&key=${this.apiKey}`;
    return this.http.get(url);
  }

}
