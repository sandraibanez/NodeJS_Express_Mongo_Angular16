const Category = require("../models/category.model.js");
const mongoose = require('mongoose');
const Product = mongoose.model('Product');
async function get_carousel_category (req, res) {
    try {
        const category = await Category.find();
        res.json(category.map(c => c.toCarouselResponse()));
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}
async function get_carousel_product (req, res) {

    try {
        const slug = req.params.slug
        const product = await Product.findOne({ slug: slug });
        const productcarousel = await product.toProductCarouselResponse();
        // res.json(await product.map(c => c.toProductCarouselResponse()));
        res.json(await productcarousel);
    } catch (error) {
        res.status(500).send({message: "An error has ocurred"});
    }
}
const carousel_controller = {
    get_carousel_category:get_carousel_category,
    get_carousel_product:get_carousel_product
}
module.exports = carousel_controller