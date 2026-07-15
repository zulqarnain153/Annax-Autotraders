export type FuelType = "Petrol" | "Diesel" | "Hybrid" | "Electric";
export type Transmission = "Manual" | "Automatic";
export type BodyType =
  | "Hatchback"
  | "Saloon"
  | "Estate"
  | "SUV"
  | "Coupe"
  | "Convertible"
  | "MPV";

export interface Vehicle {
  id: string;
  slug: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  price: number;
  monthlyFinance: number;
  mileage: number;
  fuelType: FuelType;
  transmission: Transmission;
  bodyType: BodyType;
  colour: string;
  engineSize: string;
  doors: number;
  seats: number;
  registration: string;
  mot: {
    expiry: string;
    status: "Valid" | "Due Soon";
  };
  owners: number;
  ulez: boolean;
  status: "In Stock" | "Reserved" | "Sold" | "Just Arrived";
  featured: boolean;
  description: string;
  features: string[];
  history: {
    label: string;
    detail: string;
  }[];
  silhouetteSeed: number;
  createdAt: string;
}

export interface Review {
  id: string;
  name: string;
  rating: number;
  date: string;
  vehicle?: string;
  text: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}
