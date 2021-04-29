const express = require('express')
const router = express.Router()
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const productController = require('../controllers/product.controller');

// Retrieve all products
router.get('/', productController.findAll);

// Create a new product
router.post('/', productController.create);

// Create products with CSV
router.post('/csv', upload.single('file'), productController.csv);

// Retrieve a single product with id
router.get('/:id', productController.findById);

// Update a product with id
router.put('/:id', productController.update);

// Delete a product with id
router.delete('/:id', productController.delete);

module.exports = router