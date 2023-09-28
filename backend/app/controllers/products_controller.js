const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Category = require("../models/category.model.js");
const categoryModel = require('../models/category.model.js');
const asyncHandler = require("express-async-handler");
async function getall_products(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_products
async function getone_product(req, res) {
    // console.log('getone_product');
    try {
        const slug = req.params.slug
        const product = await Product.findOne({ slug: slug });
        if (!product) {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        } else {
            res.json(product);
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
};//getone_product

async function create_product(req, res) {
    try {
        const product_data = {
            name: req.body.name || null,
            price: req.body.price || 0,
            description: req.body.description || null,
            id_category: req.body.id_category || null,
            name_cat: req.body.name_cat || null,
            state: req.body.state || null,
            location: req.body.location || null,
            product_images: req.body.product_images || null
            
        };
    //    // Inicializa la categoría
    //      const category = await Category.findOne({ slug: product_data.id_category });
    //      if (category) {
    //         // La categoría existe
    //         const products = category.products;
    //       } else {
    //         console.log("error");
    //       }
    //     const product = new Product(product_data);
    //     // Guarda el producto en la base de datos
    //     await product.save();

    //     // Agrega el producto a la categoría
    //     category.products.push(product._id);
    //      // Guarda la categoría en la base de datos
    //      await category.save();
    // Inicializa la categoría
    console.log(product_data.id_category);
    const category = await Category.findOne({ slug: product_data.id_category });

    // Crea un nuevo producto
    const product = new Product(product_data);

    // Guarda el producto en la base de datos
    await product.save();

    // Agrega el producto a la categoría
    category.products.push(product._id);

    // Guarda la categoría en la base de datos
    await category.save();

    // Devuelve el producto creado
    res.json(await product.toproductresponse());
        // const category = await Category.updateOne({slug: product.id_category}, {$push: {products: product._id}})
        //  category = await Category.findOne({slug}).exec();
        // const Category = category.addproducts
        // await Category.addproducts({slug: product.id_category}, {$push: {products: product._id}})

        // const new_product = await product.save();
      } catch (error) {
        res.status(500).send({message: error.message || "Some error occurred while creating the Product."});
      }
}//create_product
// --------------------------------------------------------
readProductsWithCategory = asyncHandler(async (req, res) => {
    try {
        const slug = req.params.slug;
        // console.log(slug);
        const products = await Product.findOne({ id_category: slug });
        console.log(products);
        if (!products) {
          res.status(404).json({ msg: "No existe el product" });
        }
        res.json(products);
      } catch (error) {
        res.status(400).send({ message: "Some error occurred while retrieving categorys." });
      }
  });
  

// ---------------------------------------------------------

async function delete_product(req, res) {
    try {
        const slug = req.params.slug
        const product = await Product.findOneAndDelete({ slug: slug });
        if (!product) {res.status(404).send({ message: `Cannot delete Product with id=${slug}. Maybe Product was not found!`}); }
        res.send({message: "Product was deleted successfully!"});
      } catch (error) {
        if (error.kind === 'ObjectId') {res.status(404).send({ message: `Product not found!`}); }
        else { res.status(500).send({ message: "Could not delete that Product" }); }
      }
}//delete_product

async function update_product(req, res) {
    
    try {
        const slug = req.params.slug
        const old_product = await Product.findOne({ slug: slug });
        if (old_product.name !== req.body.name && req.body.name !== undefined) {
            old_product.slug = null;
        }//end if
        old_product.name = req.body.name || old_product.name;
        old_product.price = req.body.price || old_product.price;
        old_product.description = req.body.description || old_product.description;
        old_product.id_category = req.body.id_category || old_product.id_category;
        old_product.name_cat = req.body.name_cat || null,
        old_product.state = req.body.state || null,
        old_product.locatio = req.body.location || null,
        old_product.product_images = req.body.product_images || null
     
        const update = await old_product.save();

        if (!update) { res.status(404).json(FormatError("Product not found", res.statusCode)); } else {
            res.json({ msg: "Product updated" })
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
}//update_product

async function deleteAll_product(req, res) {
    try {
        const deleteALL = await Product.deleteMany();
        res.send({message: `Products were deleted successfully!`});
      } catch (error) {
        res.status(500).send({message: error.message || "Some error occurred while removing all products."});
      }
}//deleteAll_product

const product_controller = {
    getall_products: getall_products,
    getone_product: getone_product,
    create_product: create_product,
    delete_product: delete_product,
    update_product: update_product,
    deleteAll_product: deleteAll_product,
    readProductsWithCategory
}

module.exports = product_controller
// ---------------------------------------------------------------------------------
