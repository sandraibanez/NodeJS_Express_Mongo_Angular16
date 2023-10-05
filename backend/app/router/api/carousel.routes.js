const router = require('express').Router();

const carousel_controller = require('../../controllers/carousel.controller.js');
//api/categories/carousel
router.get('/categories',carousel_controller.get_carousel_category);
router.get('/products/:slug',carousel_controller.get_carousel_product);
module.exports = router;