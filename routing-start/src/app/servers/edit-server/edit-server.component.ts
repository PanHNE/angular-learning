import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, Params, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { ServersService } from '../servers.service';
import { CanComponentDeactive, CanDeactiveteGuard } from './can-deactive-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-server',
  templateUrl: './edit-server.component.html',
  styleUrls: ['./edit-server.component.css']
})
export class EditServerComponent implements OnInit, CanDeactiveteGuard {
  server: {id: number, name: string, status: string};
  serverName = '';
  serverStatus = '';
  allowEdit = false;
  changesSaved = false;

  constructor(
    private serversService: ServersService, 
    private route: ActivatedRoute,
    private router:Router
  ) {

  }

  ngOnInit() {
    this.route.queryParams
      .subscribe(
        (queryParams: Params) => {
          let editQuery =  queryParams['allowEdit'];
          console.log(editQuery)
          this.allowEdit = editQuery === '1' ? true : false;
        }
      )
    this.route.fragment.subscribe();
    const id = +this.route.snapshot.params['id'];
    this.server = this.serversService.getServer(id);
    this.serverName = this.server.name;
    this.serverStatus = this.server.status;
  }

  onUpdateServer() {
    this.serversService.updateServer(this.server.id, {name: this.serverName, status: this.serverStatus});
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  canDeactivate(
    component: CanComponentDeactive,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot
  ): boolean | Promise<boolean> | Observable<boolean> {
    if (!this.allowEdit){
      return true;
    }

    if ((this.serverName !== this.server.name || this.serverStatus !== this.server.status) && !this.changesSaved) {
      return confirm('Do you want to discard the changes?')
    } else {
      return true;
    }
  }
}
