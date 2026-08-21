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
  /** Optional real photos, e.g. ["/vehicles/bmw-3-series-2022/1-front.jpg", ...].
   *  When present, these are shown instead of the generated silhouette. */
  images?: string[];
  /** Optional extended specification fields. When present, the vehicle detail
   *  page's Specifications grid shows these alongside the standard 8 items.
   *  Vehicles without these fields show exactly the same 8 items as before. */
  power?: string;
  cylinders?: number;
  engineType?: string;
  topSpeed?: string;
  fuelTankCapacity?: string;
  valvesPerCylinder?: number;
  euroStatus?: string;
  createdAt: string;
}

export interface NewsArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}
