export interface Patient {
  _id: string;
  prenom: string;
  nom : string;
  genre: string;
  adresse: string;
  telephone: string;
  email: string;
  password: string;
  groupeSanguin: string;
  createdAt: Date;
}
