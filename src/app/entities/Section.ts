import {Likes} from './Likes';
import {Comments} from './Comments';

export interface Section {
  id: number;
  name: string;
  description: string;
  price: number;
  stock: number;
  picture_advertisement: string;
  picture_story: string;
  id_pharmacy: number;
  id_author: number;
  type_section: string;
  likes: Likes[];
  comments: Comments[];
}
