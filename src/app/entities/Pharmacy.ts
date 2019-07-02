import {Catalog} from './Catalog';
import {Rate} from './Rate';

export interface Pharmacy {
  id: number;
  name: string;
  email: string;
  description: string;
  phone: string;
  city: string;
  adresse: string;
  postalcode: string;
  picture1: string;
  picture2: string;
  picture3: string;
  nbclickcall: number;
  longitude: number;
  latitude: number;
  createdAt: Date;
  id_catalog: number;
  catalogs: Catalog;
}
