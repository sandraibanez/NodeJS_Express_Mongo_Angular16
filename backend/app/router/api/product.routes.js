const router = require('express').Router();

const product_controller = require("../../controllers/products_controller.js")

//api/products
router.get( '/', product_controller.getall_products);
router.get('/:slug', product_controller.getone_product);
router.get('/category/:slug', product_controller.readProductsWithCategory);
router.post( '/', product_controller.create_product);
router.delete('/:slug', product_controller.delete_product);
router.put('/:slug', product_controller.update_product);


module.exports = router;