import {ListProductOrder} from './ListProductOrder';

export interface Product {
  id: number;
  id_catalog: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  picture1: string;
  picture2: string;
  picture3: string;
  Listproductorder: ListProductOrder;
}
