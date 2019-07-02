import {Pharmacy} from './Pharmacy';

export interface User {
  id: number;
  lastname: string;
  firstname: string;
  pseudo: string;
  gender: string;
  email: string;
  id_pharmacy: number;
  status: number;
  password: string;
  phone: string;
  city: string;
  adresse: string;
  postalcode: string;
  avatar: string;
  nbloyalty: number;
  createdAt: Date;
}
