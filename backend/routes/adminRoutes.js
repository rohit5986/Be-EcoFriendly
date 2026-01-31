const express = require('express');
const router = express.Router();
const multer = require('multer');
const {
  getDashboardStats,
  getSalesReport,
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  bulkUploadProducts,
  getAllOrders,
  updateOrderStatus,
  getAllReviews,
  deleteReview,
  getAllUsers,
  updateUserRole
} = require('../controllers/adminController');
const { protect, admin } = require('../middleware/auth');

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-excel',
      'text/csv'
    ];
    
    if (file.mimetype.startsWith('image/') || allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images and Excel files are allowed'), false);
    }
  },
});

// All routes require authentication and admin role
router.use(protect);
router.use(admin);

// Dashboard & Analytics
router.get('/stats', getDashboardStats);
router.get('/sales-report', getSalesReport);

// Products
router.route('/products')
  .get(getAllProducts)
  .post(createProduct);

router.route('/products/:id')
  .put(updateProduct)
  .delete(deleteProduct);

router.post('/products/upload', upload.single('image'), uploadProductImage);
router.post('/products/bulk-upload', upload.single('file'), bulkUploadProducts);

// Orders
router.get('/orders', getAllOrders);
router.put('/orders/:id', updateOrderStatus);

// Reviews
router.get('/reviews', getAllReviews);
router.delete('/reviews/:productId/:reviewId', deleteReview);

// Users
router.get('/users', getAllUsers);
router.put('/users/:id/role', updateUserRole);

module.exports = router;