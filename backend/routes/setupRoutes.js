const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Product = require('../models/Product');

// One-time setup endpoint - disable after first use for security
router.post('/initialize', async (req, res) => {
  try {
    const { setupKey } = req.body;
    
    // Simple security check - set this as environment variable
    const expectedKey = process.env.SETUP_KEY || 'setup-2024-eco-friendly';
    
    if (setupKey !== expectedKey) {
      return res.status(401).json({
        success: false,
        message: 'Invalid setup key'
      });
    }

    // Check if already initialized
    const adminExists = await User.findOne({ role: 'admin' });
    if (adminExists) {
      return res.status(400).json({
        success: false,
        message: 'Setup already completed. Admin user exists.',
        admin: adminExists.email
      });
    }

    // Create admin user
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@be-ecofriendly.com',
      password: 'Admin@123456', // Change this after first login
      role: 'admin'
    });

    // Seed products
    const sampleProducts = [
      {
        name: 'Reusable Bamboo Straws Set',
        description: 'Set of 6 eco-friendly bamboo straws with cleaning brush. Perfect alternative to plastic straws.',
        price: 12.99,
        originalPrice: 19.99,
        category: 'Reusable Products',
        images: [{
          url: 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=500',
          publicId: 'sample1'
        }],
        stock: 50,
        featured: true,
        ecoScore: 95,
        tags: ['bamboo', 'reusable', 'zero-waste'],
        specifications: {
          'Material': 'Natural Bamboo',
          'Quantity': '6 straws + brush',
          'Length': '8 inches'
        }
      },
      {
        name: 'Organic Cotton Tote Bag',
        description: 'Durable and stylish organic cotton tote bag. Perfect for grocery shopping and daily use.',
        price: 15.99,
        originalPrice: 24.99,
        category: 'Sustainable Fashion',
        images: [{
          url: 'https://images.unsplash.com/photo-1591561954557-26941169b49e?w=500',
          publicId: 'sample2'
        }],
        stock: 100,
        featured: true,
        ecoScore: 90,
        tags: ['cotton', 'organic', 'reusable'],
        specifications: {
          'Material': '100% Organic Cotton',
          'Size': '15x16 inches',
          'Weight': '200g'
        }
      },
      {
        name: 'Solar Powered Phone Charger',
        description: 'Portable solar charger for phones and tablets. Harness the power of the sun!',
        price: 49.99,
        originalPrice: 79.99,
        category: 'Green Tech',
        images: [{
          url: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=500',
          publicId: 'sample3'
        }],
        stock: 30,
        featured: true,
        ecoScore: 92,
        tags: ['solar', 'renewable', 'portable'],
        specifications: {
          'Capacity': '10000mAh',
          'Solar Panel': '5W',
          'Ports': '2 USB'
        }
      },
      {
        name: 'Biodegradable Phone Case',
        description: 'Protect your phone and the planet. Fully biodegradable phone case made from plant-based materials.',
        price: 24.99,
        originalPrice: 34.99,
        category: 'Green Tech',
        images: [{
          url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=500',
          publicId: 'sample4'
        }],
        stock: 75,
        featured: false,
        ecoScore: 88,
        tags: ['biodegradable', 'phone', 'accessories'],
        specifications: {
          'Material': 'Plant-based bioplastic',
          'Compatibility': 'iPhone & Android',
          'Biodegradation': '2 years'
        }
      },
      {
        name: 'Stainless Steel Water Bottle',
        description: 'Keep your drinks cold for 24 hours or hot for 12 hours. BPA-free and eco-friendly.',
        price: 29.99,
        originalPrice: 44.99,
        category: 'Reusable Products',
        images: [{
          url: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=500',
          publicId: 'sample5'
        }],
        stock: 60,
        featured: true,
        ecoScore: 93,
        tags: ['stainless-steel', 'reusable', 'insulated'],
        specifications: {
          'Capacity': '750ml',
          'Material': 'Stainless Steel 304',
          'Insulation': 'Double-wall vacuum'
        }
      },
      {
        name: 'Eco-Friendly Yoga Mat',
        description: 'Natural rubber yoga mat. Non-toxic, biodegradable, and provides excellent grip.',
        price: 59.99,
        originalPrice: 89.99,
        category: 'Sustainable Fashion',
        images: [{
          url: 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=500',
          publicId: 'sample6'
        }],
        stock: 40,
        featured: false,
        ecoScore: 91,
        tags: ['yoga', 'natural-rubber', 'biodegradable'],
        specifications: {
          'Material': 'Natural Rubber',
          'Size': '72x24 inches',
          'Thickness': '5mm'
        }
      },
      {
        name: 'Natural Beeswax Food Wraps',
        description: 'Reusable alternative to plastic wrap. Set of 3 different sizes made with organic cotton and beeswax.',
        price: 18.99,
        originalPrice: 27.99,
        category: 'Reusable Products',
        images: [{
          url: 'https://images.unsplash.com/photo-1610557892470-55d9e80c0bce?w=500',
          publicId: 'sample7'
        }],
        stock: 80,
        featured: false,
        ecoScore: 94,
        tags: ['beeswax', 'reusable', 'zero-waste'],
        specifications: {
          'Material': 'Organic Cotton, Beeswax',
          'Sizes': 'Small, Medium, Large',
          'Reusable': 'Up to 1 year'
        }
      },
      {
        name: 'Compostable Kitchen Sponges',
        description: 'Pack of 6 biodegradable kitchen sponges. Made from cellulose and coconut fiber.',
        price: 9.99,
        originalPrice: 14.99,
        category: 'Eco-Friendly Home',
        images: [{
          url: 'https://images.unsplash.com/photo-1563453392212-326f5e854473?w=500',
          publicId: 'sample8'
        }],
        stock: 120,
        featured: false,
        ecoScore: 89,
        tags: ['compostable', 'kitchen', 'biodegradable'],
        specifications: {
          'Material': 'Cellulose & Coconut Fiber',
          'Quantity': '6 sponges',
          'Biodegradable': '100%'
        }
      }
    ];

    const products = await Product.insertMany(sampleProducts);

    res.status(201).json({
      success: true,
      message: 'Setup completed successfully!',
      data: {
        admin: {
          email: adminUser.email,
          password: 'Admin@123456',
          note: 'Please change password after first login'
        },
        productsAdded: products.length
      }
    });

  } catch (error) {
    console.error('Setup error:', error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

// Check setup status
router.get('/status', async (req, res) => {
  try {
    const adminCount = await User.countDocuments({ role: 'admin' });
    const productCount = await Product.countDocuments();
    const userCount = await User.countDocuments();

    res.json({
      success: true,
      data: {
        isInitialized: adminCount > 0,
        admins: adminCount,
        products: productCount,
        users: userCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

module.exports = router;
