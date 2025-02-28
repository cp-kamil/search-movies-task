import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class MovieService {

  constructor(private http: HttpClient) { }

  public getMovieBySearchQuery(query: string): Observable<any> {
    return this.http.get(`https://www.omdbapi.com/?apikey=d3f6c0ee&s=${query}`);
  }
}
