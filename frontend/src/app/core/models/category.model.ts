import { Product } from "./product.model";

export interface Category {
  slug: String;
  id_cat: String
  category_name: String;
  image: String;
  products: Product[]
}