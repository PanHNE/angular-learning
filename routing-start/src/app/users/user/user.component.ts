import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { UsersService } from '../users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  user: {id: number, name: string};
  paramSubscription: Subscription;

  constructor(private route: ActivatedRoute, private usersService: UsersService) { 

  }

  ngOnInit() {
    let userId: number = this.route.snapshot.params['id'];
    let userName: string = this.route.snapshot.params['name'];
    
    this.user = {
      id: userId,
      name: userName
    };

    this.paramSubscription = this.route.params
      .subscribe(
        (params: Params) => {
          this.user = {
            id: params['id'],
            name: params['name'],
          };
        }
      );
  }

  ngOnDestroy(): void {
    this.paramSubscription.unsubscribe();
  }

}
