import { Router } from "express";
import mongoose from "mongoose";
import MenuItem from "../models/MenuItem.js";
import { dbReady } from "../config/cluster.js";

const router = Router();

const fallback = [
  { category: "Starters", name: "Truffle Arancini", description: "Crispy risotto balls with truffle oil, mozzarella, and parmesan", price: 16, image: "https://images.unsplash.com/photo-1559339352-11d035aa65de?w=600" },
  { category: "Starters", name: "Seared Scallops", description: "Pan-seared scallops with cauliflower puree and caviar", price: 22, image: "https://images.unsplash.com/photo-1599084993091-1cb5c0724cc8?w=600" },
  { category: "Starters", name: "Beef Carpaccio", description: "Thinly sliced prime beef with arugula, parmesan, and balsamic glaze", price: 19, image: "https://images.unsplash.com/photo-1625943553852-781c6dd46faa?w=600" },
  { category: "Starters", name: "Lobster Bisque", description: "Creamy lobster soup with cognac and herb croutons", price: 18, image: "https://images.unsplash.com/photo-1594756202469-9ff9799b2e4e?w=600" },
  { category: "Main Courses", name: "Wagyu Steak", description: "8oz A5 wagyu with truffle mashed potatoes and asparagus", price: 68, image: "https://images.unsplash.com/photo-1600891964092-4316c288032e?w=600" },
  { category: "Main Courses", name: "Lamb Rack", description: "Herb-crusted lamb rack with rosemary jus and roasted vegetables", price: 42, image: "https://images.unsplash.com/photo-1514516345957-556ca7d90a29?w=600" },
  { category: "Main Courses", name: "Pan-Seared Salmon", description: "Atlantic salmon with lemon butter sauce and seasonal greens", price: 34, image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600" },
  { category: "Main Courses", name: "Mushroom Risotto", description: "Wild mushroom risotto with truffle oil and aged parmesan", price: 28, image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600" },
  { category: "Desserts", name: "Dark Chocolate Soufflé", description: "Rich dark chocolate soufflé with vanilla bean ice cream", price: 18, image: "https://images.unsplash.com/photo-1541783245831-57d6fb0926d3?w=600" },
  { category: "Desserts", name: "Crème Brûlée", description: "Classic vanilla crème brûlée with caramelized sugar top", price: 14, image: "https://images.unsplash.com/photo-1470324161839-ce2bb6fa6bc3?w=600" },
  { category: "Desserts", name: "Tiramisu", description: "Italian mascarpone tiramisu with espresso and cocoa", price: 16, image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600" },
  { category: "Desserts", name: "Cheesecake", description: "New York style cheesecake with berry compote", price: 15, image: "https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600" },
  { category: "Cocktails", name: "Signature Gold", description: "Champagne, gold liqueur, citrus, and edible gold flakes", price: 22, image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?w=600" },
  { category: "Cocktails", name: "Smoked Old Fashioned", description: "Bourbon, smoked cherrywood, bitters, and orange peel", price: 20, image: "https://images.unsplash.com/photo-1551751299-1b51cab2694c?w=600" },
  { category: "Cocktails", name: "Espresso Martini", description: "Vodka, espresso, coffee liqueur, and vanilla syrup", price: 18, image: "https://images.unsplash.com/photo-1513553404607-988bf2703777?w=600" },
  { category: "Cocktails", name: "Berry Spritz", description: "Aperol, prosecco, mixed berries, and mint", price: 16, image: "https://images.unsplash.com/photo-1546171758-4f76292e9431?w=600" },
];

function useDB() {
  return dbReady() && mongoose.connection.readyState === 1;
}

router.get("/", async (req, res) => {
  try {
    if (useDB()) {
      const data = await MenuItem.find().sort({ category: 1, name: 1 });
      return res.json({ success: true, data });
    }
    res.json({ success: true, data: fallback });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

export default router;
