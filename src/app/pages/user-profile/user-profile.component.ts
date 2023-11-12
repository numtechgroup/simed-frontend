import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  username = this.userService.getUsername();
  firstName = this.userService.getFirstName();
  lastName = this.userService.getLastName();
  email = this.userService.getEmail();
  adresse = this.userService.getAdresse();
  role = this.userService.getRole();
  telephone = this.userService.getTelephone();
  genre = this.userService.getGender();

  constructor(private userService: UserService) { }

  ngOnInit() {
  }

}
