// import { Profile } from './profile.model';

export interface Product {
  slug: String;
  name: String;
  price: Number;
  description: String;
  id_category: String;
  name_cat: String;
  state: String;
  location: String;
  product_images: String[];
  favorited: boolean;
  // author: Profile;
}
