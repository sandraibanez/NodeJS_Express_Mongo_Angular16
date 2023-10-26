export class Filters {
  limit?: number;
  offset?: number;
  name?: string;
  price_min?: number;
  price_max?: number;
  location?: string;
  category?: string;
  state?: String[];
  favorited?: string;
  author?: string;
  
  constructor(
    limit?: number,
    offset?: number,
    name?: string,
    price_min?: number,
    price_max?: number,
    location?: string,
    category?: string,
    state?: [],
    favorited?: string,
    author?: string
  ) {
    this.limit = limit || 3;
    this.offset = offset || 0;
    this.name = name;
    this.price_min = price_min;
    this.price_max = price_max;
    this.location = location;
    this.category = category;
    this.state = state;
    this.favorited = favorited;
    this.author = author;
  }

  // public length(): number {
  //   let count: number = 0;
  //   if (this.name) count++;
  //   if (this.price_min) count++;
  //   if (this.price_max) count++;
  //   if (this.location) count++;
  //   if (this.category) count++;
  //   if (this.state) count++;
  //   if (this.favorited) count++;
  //   if (this.author) count++;
  //   return count;
  // }
}