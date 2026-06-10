export type Badge = "Populaire" | "Nouveau" | "Épicé" | "Végé";
export type Category = "fast-food" | "patisseries" | "plats" | "desserts" | "boissons";

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: Category;
  badges?: Badge[];
  image: string;
  available?: boolean;
}

const img = (id: string) =>
  `https://images.unsplash.com/photo-${id}?w=600&h=450&fit=crop`;

export const CATEGORY_META: Record<Category, { label: string; icon: string }> = {
  "fast-food": { label: "Fast Food", icon: "Beef" },
  patisseries: { label: "Pâtisseries", icon: "Croissant" },
  plats: { label: "Plats", icon: "UtensilsCrossed" },
  desserts: { label: "Desserts", icon: "Cake" },
  boissons: { label: "Boissons", icon: "CupSoda" },
};

export const MENU: MenuItem[] = [
  // FAST FOOD
  { id: "ff1", name: "Burger Classic", description: "Steak haché, salade, tomate, oignons, sauce maison", price: 1500, category: "fast-food", badges: ["Populaire"], image: img("1568901346375-23c9450c58cd") },
  { id: "ff2", name: "Burger Spécial", description: "Double steak, bacon, cheddar fondu, sauce BBQ", price: 2200, category: "fast-food", badges: ["Populaire"], image: img("1568901346375-23c9450c58cd") },
  { id: "ff3", name: "Burger Poulet Croustillant", description: "Filet de poulet, coleslaw, mayo citronnée", price: 1800, category: "fast-food", image: img("1606755962773-d324e0a13086") },
  { id: "ff4", name: "Burger Végétarien", description: "Galette légumes, salade, tomate, sauce tahini", price: 1500, category: "fast-food", badges: ["Végé"], image: img("1520072959219-c595dc870360") },
  { id: "ff5", name: "Hot Dog Fromage", description: "Saucisse grillée, moutarde, cheddar, ketchup", price: 1200, category: "fast-food", image: img("1568901346375-23c9450c58cd") },
  { id: "ff6", name: "Kebab Maison", description: "Viande marinée, légumes, sauce yaourt-ail", price: 1500, category: "fast-food", image: img("1568901346375-23c9450c58cd") },
  { id: "ff7", name: "Ailes de Poulet x6", description: "Marinées, sauce piquante ou BBQ", price: 1500, category: "fast-food", badges: ["Épicé"], image: img("1626082927389-6cd097cdc6ec") },
  { id: "ff8", name: "Nuggets x8", description: "Poulet croustillant, ketchup ou mayo", price: 1200, category: "fast-food", image: img("1562967914-608f82629710") },
  { id: "ff9", name: "Frites Maison", description: "Portion généreuse, sel et épices", price: 500, category: "fast-food", image: img("1576107232684-1279f390859f") },
  { id: "ff10", name: "Frites Chargées", description: "Fromage fondu, sauce bacon, oignons frits", price: 800, category: "fast-food", image: img("1576107232684-1279f390859f") },
  // PLATS
  { id: "pl1", name: "Riz au Poulet Braisé", description: "Riz blanc, poulet grillé, sauce tomate-épices, salade", price: 2000, category: "plats", badges: ["Populaire"], image: img("1604908176997-125f25cc6f3d") },
  { id: "pl2", name: "Riz Sauté Légumes", description: "Riz cantonais, légumes, œuf sauté", price: 1500, category: "plats", badges: ["Végé"], image: img("1603133872878-684f208fb84b") },
  { id: "pl3", name: "Spaghetti Bolognaise", description: "Spaghetti al dente, sauce viande mijotée, parmesan", price: 1800, category: "plats", image: img("1512058564366-18510be2db19") },
  { id: "pl4", name: "Poulet Frit + Frites", description: "Cuisse de poulet dorée, frites croustillantes, sauce", price: 2500, category: "plats", badges: ["Populaire"], image: img("1626082927389-6cd097cdc6ec") },
  { id: "pl5", name: "Poisson Braisé + Alloco", description: "Poisson grillé, sauce pimentée, bananes plantains", price: 2500, category: "plats", image: img("1626808642875-0aa545482dfb") },
  { id: "pl6", name: "Omelette Garnie", description: "Moelleuse, fromage, jambon, légumes sautés", price: 1200, category: "plats", image: img("1604908176997-125f25cc6f3d") },
  { id: "pl7", name: "Sandwich Club", description: "Pain grillé, poulet, bacon, salade, mayo", price: 1500, category: "plats", image: img("1528735602780-2552fd46c7af") },
  // PATISSERIES
  { id: "pa1", name: "Croissant Pur Beurre", description: "Feuilleté, doré, beurre de qualité", price: 400, category: "patisseries", image: img("1509440159596-0249088772ff") },
  { id: "pa2", name: "Pain au Chocolat", description: "Chocolat noir coulant, pâte feuilletée", price: 500, category: "patisseries", image: img("1608198093002-ad4e005484ec") },
  { id: "pa3", name: "Brioche Nature", description: "Moelleuse, légère, beurre de qualité", price: 500, category: "patisseries", image: img("1509440159596-0249088772ff") },
  { id: "pa4", name: "Brioche Fourrée", description: "Confiture fraise ou Nutella", price: 700, category: "patisseries", image: img("1612203985729-70726954388c") },
  { id: "pa5", name: "Chausson aux Pommes", description: "Pommes caramélisées, feuilletage croustillant", price: 600, category: "patisseries", image: img("1509440159596-0249088772ff") },
  { id: "pa6", name: "Muffin Chocolat", description: "Chocolat intense, cœur moelleux", price: 600, category: "patisseries", badges: ["Populaire"], image: img("1607958996333-41aef7caefaa") },
  { id: "pa7", name: "Éclair Café", description: "Pâte à choux, crème café, glaçage brillant", price: 700, category: "patisseries", image: img("1612203985729-70726954388c") },
  { id: "pa8", name: "Tarte aux Fruits", description: "Fruits frais de saison, crème pâtissière", price: 800, category: "patisseries", badges: ["Nouveau"], image: img("1483695028939-5bb13f8648b0") },
  { id: "pa9", name: "Macarons x3", description: "Pistache, chocolat, framboise", price: 1200, category: "patisseries", image: img("1606890737304-57a1ca8a5b62") },
  { id: "pa10", name: "Chouquettes x6", description: "Légères, croustillantes, perles de sucre", price: 500, category: "patisseries", image: img("1509440159596-0249088772ff") },
  // DESSERTS
  { id: "de1", name: "Fondant au Chocolat", description: "Cœur coulant, boule glace vanille", price: 1200, category: "desserts", badges: ["Populaire"], image: img("1606890737304-57a1ca8a5b62") },
  { id: "de2", name: "Tiramisu Maison", description: "Mascarpone, café, biscuits cuillère", price: 1000, category: "desserts", image: img("1606890737304-57a1ca8a5b62") },
  { id: "de3", name: "Panna Cotta Vanille", description: "Coulis fruits rouges maison", price: 900, category: "desserts", image: img("1601000938259-9e92002320b2") },
  { id: "de4", name: "Crème Caramel", description: "Caramel maison, texture crémeuse", price: 800, category: "desserts", image: img("1601000938259-9e92002320b2") },
  { id: "de5", name: "Salade de Fruits Frais", description: "Fruits de saison, sirop léger", price: 700, category: "desserts", badges: ["Végé"], image: img("1483695028939-5bb13f8648b0") },
  { id: "de6", name: "Mousse au Chocolat", description: "Légère, intense, chocolat 70%", price: 900, category: "desserts", image: img("1606890737304-57a1ca8a5b62") },
  { id: "de7", name: "Glace 2 boules", description: "Vanille, chocolat, fraise ou café — au choix", price: 700, category: "desserts", image: img("1606890737304-57a1ca8a5b62") },
  // BOISSONS
  { id: "bo1", name: "Jus de Bissap", description: "Hibiscus frais, légèrement sucré, menthe", price: 500, category: "boissons", image: img("1513558161293-cdaf765ed2fd") },
  { id: "bo2", name: "Jus de Gingembre", description: "Piquant, revigorant, citron", price: 500, category: "boissons", badges: ["Épicé"], image: img("1544145945-f90425340c7e") },
  { id: "bo3", name: "Jus d'Orange Pressé", description: "Pressé à la commande", price: 600, category: "boissons", image: img("1600271886742-f049cd451bba") },
  { id: "bo4", name: "Smoothie Mangue-Ananas", description: "Fruits tropicaux frais, sans sucre ajouté", price: 800, category: "boissons", image: img("1505252585461-04db1eb84625") },
  { id: "bo5", name: "Milkshake Chocolat", description: "Onctueux, chocolat maison, crème", price: 900, category: "boissons", badges: ["Populaire"], image: img("1513558161293-cdaf765ed2fd") },
  { id: "bo6", name: "Milkshake Vanille-Caramel", description: "Vanille bourbon, caramel artisanal", price: 900, category: "boissons", image: img("1513558161293-cdaf765ed2fd") },
  { id: "bo7", name: "Café Noir Arabica", description: "Serré, intense, grain sélectionné", price: 400, category: "boissons", image: img("1513558161293-cdaf765ed2fd") },
  { id: "bo8", name: "Chocolat Chaud", description: "Onctueux, cacao pur, lait entier", price: 600, category: "boissons", image: img("1544145945-f90425340c7e") },
  { id: "bo9", name: "Eau Minérale 33cl", description: "", price: 300, category: "boissons", image: img("1544145945-f90425340c7e") },
  { id: "bo10", name: "Coca-Cola 33cl", description: "", price: 500, category: "boissons", image: img("1544145945-f90425340c7e") },
  { id: "bo11", name: "Sprite 33cl", description: "", price: 500, category: "boissons", image: img("1544145945-f90425340c7e") },
];

export const WHATSAPP_PRIMARY = "22870135959";
export const WHATSAPP_SECONDARY = "22896357474";
