import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { TestService } from 'src/app/services/test.service';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit {
  roles: String[] = ['admin', 'patient', 'docteur'];
  genders: String[] = ['Masculin', 'Feminin'];
  addUserForm: FormGroup;
  error: string;

  ngOnInit() {

  }
  constructor(private formBuilder: FormBuilder,
     private userService: UserService){

    this.addUserForm = this.formBuilder.group({
      prenom : ['', Validators.required],
      nom : ['', Validators.required],
      genre : ['', Validators.required],
      adresse : ['', Validators.required],
      telephone : ['', Validators.required],
      role : ['', Validators.required],
      email : ['', Validators.required],
      password : ['', Validators.required],
      new_password : ['', Validators.required],
    })
  }

  get f(){
    return this.addUserForm.controls;
  }

  addUser(){
      this.userService.createUser(this.addUserForm.value).pipe().subscribe({
        next(value) {
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Utilisateur enregistré avec succés',
            timer: 1000
          }),
          window.location.reload();
        },
        error(err) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Quelque chose s\'est mal passé !',
            timer: 1000
          }),
          console.error(err)
        },
      })
     }
     reloadPage(): void {
      window.location.reload();
    }
}
