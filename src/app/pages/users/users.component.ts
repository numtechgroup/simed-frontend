import { Component } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  fetchedUser : any;


   constructor(public dialog: MatDialog,
                private _userService: UserService,
    ) { }

  ngOnInit(): void {
    this._userService.fetchedUsers$.subscribe({
    next: (response: User[] | null) => {
      if (response !== null) {
        this.fetchedUser = response;
      } else {
        console.log('error :', response)
      }
    },
    error: (errors) => {
      console.log(errors);
    },
  });
  }
}
