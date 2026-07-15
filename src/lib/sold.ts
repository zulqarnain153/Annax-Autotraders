export interface SoldVehicle {
  id: string;
  make: string;
  model: string;
  variant: string;
  year: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bhp: number;
  highlights: string[];
  description: string;
  location: string;
  images: string[];
}

export const soldVehicles: SoldVehicle[] = [
  {
    id: "sold-1",
    make: "Vauxhall",
    model: "Insignia",
    variant: "Grand Sport SRI Nav EcoTec",
    year: 2017,
    mileage: 138000,
    fuelType: "Diesel",
    transmission: "6-Speed Manual",
    bhp: 134,
    highlights: [
      "New Clutch Fitted",
      "Fresh 12 Months MOT",
      "Clean Inside & Out",
      "Drives Excellent",
    ],
    description:
      "A spacious, economical and reliable family car in good condition for its age and mileage.",
    location: "Staines-upon-Thames, TW18",
    images: [
      "/sold/vauxhall-insignia-2017/1-front-three-quarter.jpg",
      "/sold/vauxhall-insignia-2017/2-front.jpg",
      "/sold/vauxhall-insignia-2017/7-side.jpg",
      "/sold/vauxhall-insignia-2017/6-rear.jpg",
      "/sold/vauxhall-insignia-2017/5-boot.jpg",
      "/sold/vauxhall-insignia-2017/4-interior.jpg",
      "/sold/vauxhall-insignia-2017/8-front-dusk.jpg",
      "/sold/vauxhall-insignia-2017/9-side-alt.jpg",
      "/sold/vauxhall-insignia-2017/3-sold-stamp.jpg",
    ],
  },
];
