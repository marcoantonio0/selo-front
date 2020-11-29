import { UsersService } from './../../_services/users.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  public users;
  constructor(
    private sUsers: UsersService
  ) { }

  ngOnInit(): void {
    this.sUsers.list().subscribe(r => {
      this.users = r;
    });
  }

  active(id){
    this.sUsers.active(id).subscribe(r => {
      const index = this.users.findIndex(x => x.id == id);
      this.users[index].status = 1;
    });
  }

  inactive(id){
    this.sUsers.inactive(id).subscribe(r =>{
      const index = this.users.findIndex(x => x.id == id);
      this.users[index].status = 2;
    });
  }

}
