const mongoose = require("mongoose");

// 1️⃣ Define Variant schema (nested)
const variantSchema = new mongoose.Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  stock: { type: Number, default: 0 }
});

// 2️⃣ Define Product schema
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  variants: [variantSchema] // nested array of variants
});

// 3️⃣ Create Product model
const Product = mongoose.model("Product", productSchema);

// 4️⃣ Sample insertions
async function createSampleProducts() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");

  const products = [
    {
      name: "T-Shirt",
      price: 20,
      category: "Apparel",
      variants: [
        { color: "Red", size: "M", stock: 10 },
        { color: "Blue", size: "L", stock: 5 }
      ]
    },
    {
      name: "Sneakers",
      price: 50,
      category: "Footwear",
      variants: [
        { color: "White", size: "9", stock: 8 },
        { color: "Black", size: "10", stock: 12 }
      ]
    },
    {
      name: "Backpack",
      price: 40,
      category: "Accessories",
      variants: [
        { color: "Gray", size: "Standard", stock: 15 },
        { color: "Blue", size: "Large", stock: 7 }
      ]
    }
  ];

  await Product.insertMany(products);
  console.log("Sample products inserted!");
  mongoose.connection.close();
}

// 5️⃣ Queries examples
async function queryProducts() {
  await mongoose.connect("mongodb://127.0.0.1:27017/ecommerceDB");

  // Get all products
  const allProducts = await Product.find();
  console.log("All products:", allProducts);

  // Filter products by category
  const apparelProducts = await Product.find({ category: "Apparel" });
  console.log("Apparel products:", apparelProducts);

  // Project specific variant details (only name and variants color + stock)
  const projected = await Product.find({}, { name: 1, "variants.color": 1, "variants.stock": 1 });
  console.log("Projected variant details:", projected);

  mongoose.connection.close();
}

// Uncomment to run either function
// createSampleProducts();
// queryProducts();

module.exports = Product;
