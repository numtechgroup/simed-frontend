import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DoctorService } from 'src/app/services/doctor.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-folder',
  templateUrl: './add-folder.component.html',
  styleUrls: ['./add-folder.component.scss']
})
export class AddFolderComponent implements OnInit {

  selectedImgUrls: { [key: string]: string } = {};
  addFolderForm : FormGroup;
  fetchedPatients: any[] = [];
  patientsOptions: { id: string, nom: string }[] = [];

  constructor(private formBuilder: FormBuilder,private doctorService: DoctorService){
    this.formInit();
  }
  ngOnInit(){
    this.getPatients();
  }
  getFormControlName(controlPath: string): string {
    return controlPath.split('.').reduce((group, control) => {
      return group.get(control) as FormGroup;
    }, this.addFolderForm).value;
  }

  formInit(){
    this.addFolderForm = this.formBuilder.group({
      identification : this.formBuilder.group({
        patient: [''],
        profession: [''],
        numeroDossier: [this.generateRandomNumber(),],
      }),
      aspectsCliniques: this.formBuilder.group({
        motifConsultation: [''],
        antecedents: this.formBuilder.group({
          ophtalmologiques: this.formBuilder.group({
            chirurgieGlaucome: [false],
            dateGlaucome:[''],
            chirurgieCataracte: [false],
            dateCataracte: [''],
            autres: [''],
          }),
          generaux: this.formBuilder.group({
            hta: [false],
            diabete: [false],
            dysthyroidies: [false],
          }),
          familiaux: this.formBuilder.group({
            maladiesGenetiques: [false],
            typeMaladieGenetique: [''],
            glaucomes: [false],
            membresFamilleAtteints: [''],
            ametropies: [false],
          }),
        }),
      }),
      examensCliniques: this.formBuilder.group({
        avlsc: this.formBuilder.group({
          oeilDroit: [''],
          oeilGauche: [''],
        }),
        avlac: this.formBuilder.group({
          oeilDroit: [''],
          oeilGauche: [''],
        }),
        avp: this.formBuilder.group({
          oeilDroit: [''],
          oeilGauche: [''],
        }),
        refraction: this.formBuilder.group({
          oeilDroit: [''],
          oeilGauche: [''],
        }),
        skiascopie: this.formBuilder.group({
          oeilDroit: [''],
          oeilGauche: [''],
        }),
          annexes:[''],
          segmentAnterieur: [''],
          tonusOculaire: [''],
          fondOeil: [''],
        hypotheseDiagnostic: [''],
        conduiteATenir: [''],
      }),
        pachymetrie: [''],
        echographieB: [''], // You may need to use a different form control for file upload
        biometrie: [''], // You may need to use a different form control for file upload
        champVisuel: [''],
        retinographie: [''], // You may need to use a different form control for file upload
        oct: [''],
        radiographie: [''], // You may need to use a different form control for file upload
        scannerOrbitaire: [''], // You may need to use a different form control for file upload
        irm: [''], // You may need to use a different form control for file upload
        echographie: [''],
      biologie: this.formBuilder.group({
        gaj: [''],
        hba1c: [''],
        nfs: [''],
        tp: [''],
        tck: [''],
        creatinine: ['']
      }),
      resultats: this.formBuilder.group({
        diagnosticPositif: [''],
        traitement: [''],
        evolution: [''],
      }),
    });

  }

  generateRandomNumber(): string {
    const randomNumber = Math.floor(100000 + Math.random() * 900000).toString();
    return `D-${new Date().getFullYear()}-${randomNumber}`;
  }


  getPatients() {
    this.doctorService.getAllPatients().subscribe(
      (patients: any[]) => {
        this.fetchedPatients = patients;
        this.patientsOptions = patients.map(option => ({ id: option._id, nom: `${option.prenom} ${option.nom}`}));
        console.log('patients',this.patientsOptions);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }

  createFolder() {
    console.log('createFolder', this.addFolderForm.value);

    this.doctorService.createDossier(this.addFolderForm.value).subscribe(
      (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Dossier médical créé avec succès',
          timer: 1000,
        });
        window.location.reload();
        console.log('Dossier added successfully:', response);
      },
      (error) => {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: error.error.message,
          timer: 1000,
        });
        console.error('Error adding dossier:', error);
      }
    );
  }

  uploadImage(fileList: FileList, formControlName: string) {
    // Check if fileList is not empty
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      const formData = new FormData();
      formData.append(formControlName, file);

      // Track the selected image URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result) {
          this.selectedImgUrls[formControlName] = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
      console.log(`Uploaded files for ${formControlName}:`, this.selectedImgUrls);

      // Set the form control value with the FormData
      this.addFolderForm.get(formControlName).setValue(file);
    } else {
      // Handle the case where no files are selected
      console.log('You must select at least 1 file');
    }
  }

}
