import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Post } from './post.model';
import { PostsService } from './post.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient, private postService: PostsService) {}

  ngOnInit() {
    this.loadDate();
  }

  onCreatePost(postData: Post) {
    // Send Http request
    this.postService
      .createAndStorePost(postData)
      .subscribe(
        response => {
          console.log(response);
        },
        error => {
          this.error = error.error.message;
        }
      );;
  }

  onFetchPosts() {
    // Send Http request
    this.loadDate();
  }

  onClearPosts() {
    this.postService.deleteAllPosts().subscribe( response => {
      console.log(response);
      this.loadedPosts = [];
    });
  }

  onHandleError() {
    this.error = null;
  }

  loadDate() {
    this.isFetching = true;
    this.postService
    .fetchPosts()
    .subscribe(
      posts => {
        console.log(posts);
        this.isFetching = false;
        this.loadedPosts = posts;
      },
      error => {
        console.log(error);
        this.error = error.message;
      } 
    );
  }
}
