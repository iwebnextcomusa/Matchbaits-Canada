export interface Product {
  id: string;
  name: string;
  category: "Groundbait" | "Pellets" | "Boilies" | "Hookbait" | "Liquid Attractants" | "Fishing Accessories" | "Terminal Tackle";
  description: string;
  price: number;
  image: string;
  rating: number;
  reviewsCount: number;
  features: string[];
  stock: number;
  reviews: Review[];
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  category: "Tips" | "Guides" | "Tactics";
  summary: string;
  content: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  role: string;
  text: string;
  rating: number;
  avatar: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}
