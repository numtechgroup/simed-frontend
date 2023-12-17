export interface Doctor {
    _id: string;
    prenom: string;
    nom : string;
    genre: string;
    adresse: string;
    telephone: string;
    email: string;
    password: string;
    specialite: string;
    hopital: string;
    token: string;
    createdAt: Date;
}
