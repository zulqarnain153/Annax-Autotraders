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
  {
    id: "sold-2",
    make: "BMW",
    model: "3 Series",
    variant: "320i M Sport",
    year: 2008,
    mileage: 100928,
    fuelType: "Petrol",
    transmission: "6-Speed Automatic",
    bhp: 168,
    highlights: [
      "1 Owner From New",
      "M Sport Estate",
      "Euro 4 / ULEZ Compliant",
      "168 BHP Petrol",
    ],
    description:
      "A practical, well-equipped M Sport Touring with BMW's smooth 168bhp 2.0-litre petrol engine and 6-speed automatic gearbox — a genuine one-owner example with 100,928 miles on the clock.",
    location: "Staines-upon-Thames, TW18",
    images: [
      "/sold/bmw-320i-m-sport-2008/1-front.jpg",
      "/sold/bmw-320i-m-sport-2008/2-front-three-quarter.jpg",
      "/sold/bmw-320i-m-sport-2008/3-front-three-quarter-alt.jpg",
      "/sold/bmw-320i-m-sport-2008/4-rear-three-quarter.jpg",
      "/sold/bmw-320i-m-sport-2008/5-interior-detail.jpg",
      "/sold/bmw-320i-m-sport-2008/6-interior-dash.jpg",
      "/sold/bmw-320i-m-sport-2008/7-handover.jpg",
    ],
  },
  {
    id: "sold-3",
    make: "Kia",
    model: "Picanto",
    variant: "VR7",
    year: 2015,
    mileage: 96000,
    fuelType: "Petrol",
    transmission: "5-Speed Manual",
    bhp: 65,
    highlights: [
      "1 Owner From New",
      "Fresh MOT to December 2026",
      "Alloy Wheels",
      "Cheap to Insure & Run",
    ],
    description:
      "A practical, low-cost first car finished in eye-catching red, with a 1.0-litre petrol engine that keeps fuel and insurance costs down.",
    location: "Staines-upon-Thames, TW18",
    images: [
      "/vehicles/kia-picanto-2015-vr7/1-front-three-quarter.jpg",
      "/vehicles/kia-picanto-2015-vr7/2-front.jpg",
      "/vehicles/kia-picanto-2015-vr7/3-side.jpg",
      "/vehicles/kia-picanto-2015-vr7/4-rear-three-quarter.jpg",
      "/vehicles/kia-picanto-2015-vr7/5-rear.jpg",
      "/vehicles/kia-picanto-2015-vr7/6-rear-detail.jpg",
      "/vehicles/kia-picanto-2015-vr7/7-side-detail.jpg",
      "/vehicles/kia-picanto-2015-vr7/8-interior-dash.jpg",
      "/vehicles/kia-picanto-2015-vr7/9-interior-odometer.jpg",
    ],
  },
];
