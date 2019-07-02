import {enumOrderStatus} from './enumOrderStatus';
import {Product} from './Product';
import {ListProductOrder} from './ListProductOrder';
import {User} from './User';

export interface Orders {
  id: number;
  id_stripe: string;
  id_user: number;
  id_pharmacy: number;
  totalprice: number;
  status: enumOrderStatus;
  nbloyalty: number;
  updatedAt: Date;
  createdAt: Date;
  products: Product [];
  user?: User;
}
