const router = require('express').Router();
const verifyJWT = require('../../middleware/verifyJWT');
const verifyJWTOptional = require('../../middleware/verifyJWTOptional');
const product_controller = require("../../controllers/products_controller.js")

//api/products
router.get( '/', product_controller.getall_products);
// router.get('/user/products', verifyJWT, product_controller.find_products_user);
router.get('/:slug',verifyJWT, product_controller.getone_product);
router.get('/category/:slug', product_controller.readProductsWithCategory);
router.post( '/',verifyJWT, product_controller.create_product);
router.delete('/:slug', product_controller.delete_product);
router.put('/:slug',verifyJWT, product_controller.update_product);
router.post('/:slug/favorite', verifyJWT, product_controller.favorite);
router.delete('/:slug/favorite', verifyJWT, product_controller.unfavorite);
router.get('/user/favorites', verifyJWT, product_controller.get_favorites);


module.exports = router;