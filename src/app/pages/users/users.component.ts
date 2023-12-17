import {Component, inject, Input} from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import {MatDialog, MatDialogModule} from "@angular/material/dialog";
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import { AddUserComponent } from './add-user/add-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {
  fetchedUser : any;

   constructor(public dialog: MatDialog,
                private _userService: UserService) { }

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

  openDialog() {
    const dialogRef = this.dialog.open(AddUserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
