const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Category = require("../models/category.model.js");
const categoryModel = require('../models/category.model.js');
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
        // const category = await Category.findOne({slug}).exec();
        const product = new Product(product_data);
        const category = await Category.addproducts({slug: product.id_category}, {$push: {products: product._id}})
        // await category.addproducts({slug: product.id_category}, {$push: {products: product._id}})

        const new_product = await product.save();
    
        res.json(await new_product.toproductresponse());
      } catch (error) {
        res.status(500).send({message: error.message || "Some error occurred while creating the Product."});
      }
}//create_product
// --------------------------------------------------------
// const getCommentsFromArticle = asyncHandler(async (req, res) => {
//     const { slug } = req.params;

//     const article = await Article.findOne({slug}).exec();

//     if (!article) {
//         return res.status(401).json({
//             message: "Article Not Found"
//         });
//     }

//     const loggedin = req.loggedin;

//     if (loggedin) {
//         const loginUser = await User.findById(req.userId).exec();
//         return await res.status(200).json({
//             comments: await Promise.all(article.comments.map(async commentId => {
//                 const commentObj = await Comment.findById(commentId).exec();
//                 return await commentObj.toCommentResponse(loginUser);
//             }))
//         })
//     } else {
//         return await res.status(200).json({
//             comments: await Promise.all(article.comments.map(async (commentId) => {
//                 const commentObj = await Comment.findById(commentId).exec();
//                 // console.log(commentObj);
//                 const temp =  await commentObj.toCommentResponse(false);
//                 // console.log(temp);
//                 return temp;
//             }))
//         })
//     }
// });
// ---------------------------------------------------------

async function delete_product(req, res) {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({ slug: slug });
        const category = await Category.findOne({ id_cat: product.category_id });
        if(! product || ! category) {
            res.status(404).send({ message: `Cannot delete Product with slug=${slug}. Maybe Product was not found!`});
            res.json(product.toproductresponse())
        }
        // Elimina el producto de la categoría antes de eliminar el producto
        category.removeproduct(product.slug);
        // elimina el producto
        await product.deleteOne({ slug: product.slug });
        res.send({message: "Product was deleted successfully!"});
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }//end try catch
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
    deleteAll_product: deleteAll_product
}

module.exports = product_controller

