const Product = require("../models/Product");

// Insert sample products
exports.insertSampleProducts = async (req, res) => {
  try {
    const sampleProducts = [
      {
        name: "T-Shirt",
        price: 499,
        category: "Clothing",
        variants: [
          { color: "Red", size: "M", stock: 20 },
          { color: "Blue", size: "L", stock: 15 }
        ]
      },
      {
        name: "Sneakers",
        price: 2999,
        category: "Footwear",
        variants: [
          { color: "Black", size: "9", stock: 10 },
          { color: "White", size: "8", stock: 5 }
        ]
      },
      {
        name: "Backpack",
        price: 1499,
        category: "Accessories",
        variants: [
          { color: "Gray", size: "Medium", stock: 8 },
          { color: "Blue", size: "Large", stock: 6 }
        ]
      }
    ];

    await Product.insertMany(sampleProducts);
    res.json({ message: "Sample products inserted successfully!" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all products
exports.getAllProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products);
};

// Filter by category
exports.getProductsByCategory = async (req, res) => {
  const { category } = req.params;
  const products = await Product.find({ category });
  res.json(products);
};

// Project specific variant details (only color and stock)
exports.getVariantDetails = async (req, res) => {
  const products = await Product.find({}, { name: 1, "variants.color": 1, "variants.stock": 1 });
  res.json(products);
};
