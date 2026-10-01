const fs = require('fs');
const path = require('path');

const projects = [
  { dev: "Nakheel", name: "Palm Central Private Residences", folder: "Nakheel/palm central banner" },
  { dev: "Nakheel", name: "Bay Grove Residences", folder: "Nakheel/bay grove residences" },
  { dev: "Nakheel", name: "Como Residences", folder: "Nakheel/como residences" },
  { dev: "Sobha Realty", name: "Sobha Central", folder: "Sobha/Sobha Central" },
  { dev: "Sobha Realty", name: "Sobha Hartland II", folder: "Sobha/Sobha Hartland 2" },
  { dev: "Sobha Realty", name: "Skyvue", folder: "Sobha/Skyvue  Sobha Hartland 3" },
  { dev: "Azizi Developments", name: "Azizi Venice", folder: "Azizi/Azizi Venice" },
  { dev: "Azizi Developments", name: "Azizi Milan", folder: "Azizi/Azizi Milan" },
  { dev: "Azizi Developments", name: "Burj Azizi", folder: "Azizi/Burj Azizi" },
  { dev: "Azizi Developments", name: "Azizi Wares", folder: "Azizi/Azizi Wares" },
  { dev: "Azizi Developments", name: "Azizi Wasel", folder: "Azizi/Azizi Wasel" },
  { dev: "Azizi Developments", name: "Azizi Creek Views", folder: "Azizi/Azizi Creek Views" },
  { dev: "DAMAC", name: "DAMAC Lagoons Valencia", folder: "DAMAC/DAMAC Lagoons Valencia" },
  { dev: "DAMAC", name: "DAMAC Islands", folder: "DAMAC/DAMAC Islands" },
  { dev: "DAMAC", name: "Chelsea Residences", folder: "DAMAC/Chelsea Residences" },
  { dev: "DAMAC", name: "DAMAC Riverside Views", folder: "DAMAC/DAMAC Riverside Views" },
  { dev: "Danube Properties", name: "Bayz 102", folder: "danube/Bayz 102" },
  { dev: "Danube Properties", name: "Diamondz", folder: "danube/diamondz" },
  { dev: "Danube Properties", name: "Oceanz 3", folder: "danube/oceanz tower 3" },
  { dev: "Danube Properties", name: "Serenz", folder: "danube/serenz" },
  { dev: "Binghatti", name: "Mercedes-Benz Places", folder: "Binghatti/mercedes-benz places" },
  { dev: "Binghatti", name: "Burj Binghatti Jacob & Co Residences", folder: "Binghatti/burj binghatti jacob and co" },
  { dev: "Binghatti", name: "Bugatti Residences", folder: "Binghatti/bugatti residences" },
  { dev: "Binghatti", name: "Maybach Six", folder: "Binghatti/maybach six" },
  { dev: "Binghatti", name: "Skyblade", folder: "Binghatti/skyblade" },
  { dev: "Binghatti", name: "Aquarise", folder: "Binghatti/aquarise" },
  { dev: "Deyaar", name: "Tria", folder: "Deyaar/Tria by Deyaar" },
  { dev: "Dugasta", name: "Terra Tower", folder: "Dugasta/Terra Tower" },
  { dev: "Dugasta", name: "Moonsa Residences 2", folder: "Dugasta/Moonsa Residences 2" },
];

let added = [];
let idCounter = 12;

for (let p of projects) {
  const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  let images = [];
  const dirPath = path.join(__dirname, 'public/property images', p.folder);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath).filter(f => f.endsWith('.jpg') || f.endsWith('.webp') || f.endsWith('.png'));
    images = files.map(f => `/property images/${p.folder}/${f}`.replace(/\\/g, '/'));
  }

  if (images.length === 0) {
    images = ["/property images/Nakheel/bay grove residences/bay-grove-residences.jpg"];
  }

  const heroImage = images[0];
  
  // Format for DEMO_PROPERTIES
  const propStr = `  {
    id: "LY-INV-${String(idCounter).padStart(3, '0')}",
    slug: "${slug}",
    title: "${p.name}",
    shortTitle: "${p.name}",
    location: "Dubai",
    community: "Dubai Land",
    price: 0,
    currency: "AED",
    propertyType: "Apartment",
    listingType: "For Sale",
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    areaUnit: "sq ft",
    status: "Off-plan",
    developer: "${p.dev}",
    featured: false,
    newListing: true,
    reference: "LY-INV-${idCounter}",
    furnished: "Unfurnished",
    parking: 1,
    floor: null,
    views: ["City skyline"],
    image: localImg("${heroImage}", "${p.name} exterior"),
    images: [\n${images.map(img => `      localImg("${img}", "${p.name} interior"),`).join('\n')}\n    ],
    video: null,
    shortDescription: "A premium investment opportunity by ${p.dev}, offering exceptional living spaces and strong potential.",
    description: "Explore this selected Dubai development by ${p.dev}. ${p.name} presents a remarkable opportunity to invest in premium residential spaces, with thoughtful design and location. Consider location, property type and development stage for this exciting project.",
    amenities: [
      "Shared pool",
      "Residents' gym",
      "24/7 security",
      "Covered parking",
      "Concierge"
    ],
    completionDate: "2027-12",
    paymentPlan: [
      { label: "On booking", percentage: 20 },
      { label: "During construction", percentage: 40 },
      { label: "On handover", percentage: 40 }
    ],
    coordinates: { latitude: 25.1, longitude: 55.2 },
    nearby: [],
    investmentFocused: true,
    priceOnRequest: true,
    categories: ["OFF-PLAN"],
  },`;
  added.push(propStr);
  idCounter++;
}

let propertiesFile = fs.readFileSync(path.join(__dirname, 'src/data/properties.ts'), 'utf8');

const targetIndex = propertiesFile.lastIndexOf('];');

if (targetIndex > -1) {
  propertiesFile = propertiesFile.substring(0, targetIndex) + added.join('\n') + '\n' + propertiesFile.substring(targetIndex);
  fs.writeFileSync(path.join(__dirname, 'src/data/properties.ts'), propertiesFile);
  console.log("Successfully added properties.");
}
