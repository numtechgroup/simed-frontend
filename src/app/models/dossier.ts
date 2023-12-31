import { Patient } from './patient';

interface Antecedents {
  ophtalmologiques: {
    chirurgieGlaucome: string;
    dateGlaucome: Date;
    chirurgieCataracte: string;
    dateCataracte: Date;
    autres: string;
  };
  generaux: {
    hta: string;
    diabete: string;
    dysthyroidies: string;
  };
  familiaux: {
    maladiesGenetiques: string;
    typeMaladieGenetique: string | null;
    glaucomes: string;
    membresFamilleAtteints: string | null;
    ametropies: string;
  };
}

interface AspectsCliniques {
  motifConsultation: string;
  antecedents: Antecedents;
}

interface Avlsc {
  oeilDroit: string;
  oeilGauche: string;
}

interface Avlac {
  oeilDroit: string;
  oeilGauche: string;
}

interface Avp {
  oeilDroit: string;
  oeilGauche: string;
}

interface Refraction {
  oeilDroit: string;
  oeilGauche: string;
}

interface Skiascopie {
  oeilDroit: string;
  oeilGauche: string;
}

interface ExamensCliniques {
  avlsc: Avlsc;
  avlac: Avlac;
  avp: Avp;
  refraction: Refraction;
  skiascopie: Skiascopie;
  annexes : string;
  segmentAnterieur: string;
  tonusOculaire: string;
  fondOeil: string;
}


interface Biologie {
  gaj: string;
  hba1c: string;
  nfs: string;
  tp: string;
  tck: string;
  creatinine: string;
}

interface Resultats {
  diagnosticPositif: string;
  traitement: string;
  evolution: string;
}

export class Dossier {

  _id: string;
  identification: {
    patient: Patient;
    profession: string;
    numeroDossier: string;
  };
  aspectsCliniques: AspectsCliniques;
  examensCliniques: ExamensCliniques;
  hypotheseDiagnostic: string;
  conduiteATenir: string;
  pachymetrie: File;
  echographieB: File;
  biometrie: File;
  champVisuel: File;
  retinographie: File;
  oct: File;  radiographie: File;
  scannerOrbitaire: File;
  irm: File;
  echographie: File;
  biologie : Biologie;
  resultats: Resultats;

  constructor(data: Partial<Dossier>) {
    Object.assign(this, data);
  }
}
