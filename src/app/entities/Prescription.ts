export interface Prescription {
  id: number;
  id_user: number;
  title: string;
  picture_prescription: string;
  status: enumPescriptionStatus;
  nbloyalty: number;
}
