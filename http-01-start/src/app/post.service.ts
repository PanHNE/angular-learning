import { HttpClient, HttpEventType, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Post } from "./post.model";
import { catchError, map, tap } from "rxjs/operators";
import { Subject, throwError } from "rxjs";

@Injectable({ providedIn: 'root'})
export class PostsService {
  error = new Subject<string>();

  constructor(private http: HttpClient) {

  }

  createAndStorePost(postData: Post) {
    console.log(postData);
    return this.http.post<Post>(
      'https://learning-b5a0b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      postData,
      {
        headers: new HttpHeaders({'Custom-header': 'Hello'}),
        observe: 'response',
        responseType: 'json'
      }
    )
  }

  fetchPosts() {
    let searchParams = new HttpParams();
    searchParams = searchParams.append('print', 'pretty');
    searchParams = searchParams.append('custom', 'key');

    return this.http.get<{ [key: string]: Post }>(
      'https://learning-b5a0b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        headers: new HttpHeaders({
          'Custom-header': 'Hello'
        }),
        // params: new HttpParams().set('print', 'pretty')
        params: searchParams
      }
    )
    .pipe(
      map( responseData => {
        const postsArray: Post[] = [];

        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            postsArray.push({ ...responseData[key], id: key});
          }
        }

        return postsArray;
      }),
      catchError(errorRes => {
        return throwError(errorRes);
      })
    );
  }

  deleteAllPosts() {
    return this.http.delete(
      'https://learning-b5a0b-default-rtdb.europe-west1.firebasedatabase.app/posts.json',
      {
        observe: 'events',
        responseType: 'json'
      }
    ).pipe(
      tap(event => {
        console.log(event);
        if (event.type === HttpEventType.Sent) {
          console.log(event);
        }
        if (event.type === HttpEventType.Response) {
          console.log(event.body);
        }
      })
    );
  }
}