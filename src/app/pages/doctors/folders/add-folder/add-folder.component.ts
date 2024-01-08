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
        // console.log('patients',this.patientsOptions);
      },
      (error) => {
        console.error('Error fetching patients:', error);
      }
    );
  }


  uploadImage(fileList: FileList, formControlName: string) {

    console.log(fileList);
    // Check if fileList is not empty
    if (fileList && fileList.length > 0) {
      const file = fileList[0];

      this.addFolderForm.get(formControlName).setValue(file);

      // Track the selected image URL for display
      const reader = new FileReader();
      reader.onload = (e) => {
        if (reader.result) {
          this.selectedImgUrls[formControlName] = reader.result as string;
        }
      };
      reader.readAsDataURL(file);
      console.log(`Uploaded files for ${formControlName}:`, this.selectedImgUrls);
    } else {
      // Handle the case where no files are selected
      console.log('Veuillez selectionner au moins 1 fichier');
    }
  }

  createFolder() {
    // console.log('createFolder', this.addFolderForm.value);
    const formData = new FormData();
    formData.append('identification.patient', this.addFolderForm.get('identification.patient')?.value);
    formData.append('identification.profession', this.addFolderForm.get('identification.profession')?.value);
    formData.append('identification.numeroDossier', this.addFolderForm.get('identification.numeroDossier')?.value);
    formData.append('aspectsCliniques.motifConsultation', this.addFolderForm.get('aspectsCliniques.motifConsultation')?.value);
    formData.append('aspectsCliniques.antecedents.ophtalmologiques.chirurgieGlaucome', this.addFolderForm.get('aspectsCliniques.antecedents.ophtalmologiques.chirurgieGlaucome')?.value);
    formData.append('aspectsCliniques.antecedents.ophtalmologiques.dateGlaucome', this.addFolderForm.get('aspectsCliniques.antecedents.ophtalmologiques.dateGlaucome')?.value);
    formData.append('aspectsCliniques.antecedents.ophtalmologiques.chirurgieCataracte', this.addFolderForm.get('aspectsCliniques.antecedents.ophtalmologiques.chirurgieCataracte')?.value);
    formData.append('aspectsCliniques.antecedents.ophtalmologiques.dateCataracte', this.addFolderForm.get('aspectsCliniques.antecedents.ophtalmologiques.dateCataracte')?.value);
    formData.append('aspectsCliniques.antecedents.ophtalmologiques.autres', this.addFolderForm.get('aspectsCliniques.antecedents.ophtalmologiques.autres')?.value);

    formData.append('aspectsCliniques.antecedents.generaux.hta', this.addFolderForm.get('aspectsCliniques.antecedents.generaux.hta')?.value);
    formData.append('aspectsCliniques.antecedents.generaux.diabete', this.addFolderForm.get('aspectsCliniques.antecedents.generaux.diabete')?.value);
    formData.append('aspectsCliniques.antecedents.generaux.dysthyroidies', this.addFolderForm.get('aspectsCliniques.antecedents.generaux.dysthyroidies')?.value);

    formData.append('aspectsCliniques.antecedents.familiaux.maladiesGenetiques', this.addFolderForm.get('aspectsCliniques.antecedents.familiaux.maladiesGenetiques')?.value);
    formData.append('aspectsCliniques.antecedents.familiaux.typeMaladieGenetique', this.addFolderForm.get('aspectsCliniques.antecedents.familiaux.typeMaladieGenetique')?.value);
    formData.append('aspectsCliniques.antecedents.familiaux.glaucomes', this.addFolderForm.get('aspectsCliniques.antecedents.familiaux.glaucomes')?.value);
    formData.append('aspectsCliniques.antecedents.familiaux.membresFamilleAtteints', this.addFolderForm.get('aspectsCliniques.antecedents.familiaux.membresFamilleAtteints')?.value);
    formData.append('aspectsCliniques.antecedents.familiaux.ametropies', this.addFolderForm.get('aspectsCliniques.antecedents.familiaux.ametropies')?.value);

    formData.append('examensCliniques.avlsc.oeilDroit', this.addFolderForm.get('examensCliniques.avlsc.oeilDroit')?.value);
    formData.append('examensCliniques.avlsc.oeilGauche', this.addFolderForm.get('examensCliniques.avlsc.oeilGauche')?.value);

    formData.append('examensCliniques.avlac.oeilDroit', this.addFolderForm.get('examensCliniques.avlac.oeilDroit')?.value);
    formData.append('examensCliniques.avlac.oeilGauche', this.addFolderForm.get('examensCliniques.avlac.oeilGauche')?.value);

    formData.append('examensCliniques.avp.oeilDroit', this.addFolderForm.get('examensCliniques.avp.oeilDroit')?.value);
    formData.append('examensCliniques.avp.oeilGauche', this.addFolderForm.get('examensCliniques.avp.oeilGauche')?.value);

    formData.append('examensCliniques.refraction.oeilDroit', this.addFolderForm.get('examensCliniques.refraction.oeilDroit')?.value);
    formData.append('examensCliniques.refraction.oeilGauche', this.addFolderForm.get('examensCliniques.refraction.oeilGauche')?.value);

    formData.append('examensCliniques.skiascopie.oeilDroit', this.addFolderForm.get('examensCliniques.skiascopie.oeilDroit')?.value);
    formData.append('examensCliniques.skiascopie.oeilGauche', this.addFolderForm.get('examensCliniques.skiascopie.oeilGauche')?.value);


    formData.append('examensCliniques.annexes', this.addFolderForm.get('examensCliniques.annexes')?.value);
    formData.append('examensCliniques.segmentAnterieur', this.addFolderForm.get('examensCliniques.segmentAnterieur')?.value);
    formData.append('examensCliniques.tonusOculaire', this.addFolderForm.get('examensCliniques.tonusOculaire')?.value);
    formData.append('examensCliniques.fondOeil', this.addFolderForm.get('examensCliniques.fondOeil')?.value);
    formData.append('examensCliniques.hypotheseDiagnostic', this.addFolderForm.get('examensCliniques.hypotheseDiagnostic')?.value);
    formData.append('examensCliniques.conduiteATenir', this.addFolderForm.get('examensCliniques.conduiteATenir')?.value);


    formData.append('pachymetrie', this.addFolderForm.get('pachymetrie')?.value);
    formData.append('echographieB', this.addFolderForm.get('echographieB')?.value);
    formData.append('biometrie', this.addFolderForm.get('biometrie')?.value);
    formData.append('champVisuel', this.addFolderForm.get('champVisuel')?.value);
    formData.append('retinographie', this.addFolderForm.get('retinographie')?.value);
    formData.append('oct', this.addFolderForm.get('oct')?.value);
    formData.append('radioGraphie', this.addFolderForm.get('radioGraphie')?.value);
    formData.append('scannerOrbitaire', this.addFolderForm.get('scannerOrbitaire')?.value);
    formData.append('irm', this.addFolderForm.get('irm')?.value);
    formData.append('echographie', this.addFolderForm.get('echographie')?.value);



    formData.append('Biologie.gaj', this.addFolderForm.get('Biologie.gaj')?.value);
    formData.append('Biologie.hba1c', this.addFolderForm.get('Biologie.hba1c')?.value);
    formData.append('Biologie.nfs', this.addFolderForm.get('Biologie.nfs')?.value);
    formData.append('Biologie.tp', this.addFolderForm.get('Biologie.tp')?.value);
    formData.append('Biologie.tck', this.addFolderForm.get('Biologie.tck')?.value);
    formData.append('Biologie.creatinine', this.addFolderForm.get('Biologie.creatinine')?.value);


    formData.append('resultats.diagnosticPositif', this.addFolderForm.get('resultats.diagnosticPositif')?.value);
    formData.append('resultats.traitement', this.addFolderForm.get('resultats.traitement')?.value);
    formData.append('resultats.evolution', this.addFolderForm.get('resultats.evolution')?.value);

    this.doctorService.createDossier(formData).subscribe(
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

}
