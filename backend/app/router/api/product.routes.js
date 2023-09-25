const router = require('express').Router();
// console.log('hola');
const product_controller = require("../../controllers/products_controller.js")

router.get( '/', product_controller.getall_products);
router.get('/:slug', product_controller.getone_product);
router.post( '/', product_controller.create_product);
router.delete('/:slug', product_controller.delete_product);
router.put('/:slug', product_controller.update_product);

module.exports = router;