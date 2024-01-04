import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  onLoadServers() {
    // something is doing
    this.router.navigate(['/servers']) // << absolute path is safer than relative path [servers] no in this situation but in complex it will be!
  }

  onLoadServer(id: number) {
    // something is doing
    console.log("HomeComponent => onLoadServer [" + id + "]")
    this.router.navigate(['/servers', id, 'edit'], {queryParams: {allowEdit: '1'}, fragment: 'loading'}) // << absolute path is safer than relative path [servers] no in this situation but in complex it will be!
  }
}
