import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddFolderComponent } from './add-folder/add-folder.component';
import { DoctorService } from 'src/app/services/doctor.service';
import { ViewFolderComponent } from './view-folder/view-folder.component';
import { EventClickArg } from '@fullcalendar/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-folders',
  templateUrl: './folders.component.html',
  styleUrls: ['./folders.component.scss']
})
export class FoldersComponent implements OnInit {

  folders: any;
  patientsNames:any;

  constructor(private dialog: MatDialog, private router:Router, private doctorService: DoctorService){

  }
  ngOnInit() {
    this.fetchedDossiers();
  }

  openDialog(){
    this.dialog.open(AddFolderComponent);
  }
  fetchedDossiers(){
    this.doctorService.getAllDossiers().subscribe(
      (response) =>{
        this.folders = response.results;
        console.log('reponse',this.folders);
      },
      (error) =>{
        console.log(error);
      }
    )
  }

  viewDetails(folderId: String){
    const selectedFolder = this.folders.find(folder => folder._id === folderId);
    if (selectedFolder) {
      this.dialog.open(ViewFolderComponent, {
        data: {
          folder: selectedFolder,
        }
      });
    }
    }

    viewFolderDetails(folderId: string) {
      this.router.navigate(['/home/dossier', folderId]);
    }

  }
