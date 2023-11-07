const mongoose = require('mongoose');
const Product = mongoose.model('Product');
const Category = require("../models/category.model.js");
const categoryModel = require('../models/category.model.js');
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model.js");

async function getall_products(req, res) {
    try {

        let query = {};
        let transUndefined = (varQuery, otherResult) => {
          return varQuery != "undefined" && varQuery ? varQuery : otherResult;
        };
    
        let limit = transUndefined(req.query.limit, 3);
        let offset = transUndefined(req.query.offset, 0);
        let category = transUndefined(req.query.category, "");
        let name = transUndefined(req.query.name, "");
        let state = transUndefined(req.query.state, "");
        let price_min = transUndefined(req.query.price_min, 0);
        let price_max = transUndefined(req.query.price_max, Number.MAX_SAFE_INTEGER);
        let favorited = transUndefined(req.query.favorited, null);
        let author = transUndefined(req.query.author, null);
        let id_user = req.auth ? req.auth.id : null;
        let nameReg = new RegExp(name);
    
        query = {
          name: { $regex: nameReg },
          $and: [{ price: { $gte: price_min } }, { price: { $lte: price_max } }],
        };
    
        if (state != "") {
          query.state = state;
        }
        if (category != "") {
          query.id_category = category;
        }
        if (name != "") {
          query.name = name;
        }
        if (favorited) {
          const favoriter = await User.findOne({ username: favorited });
          query._id = { $in: favoriter.favorites };
        }
    
        if (author) {
          const author1 = await User.findOne({ username: author });
          query.author = { $in: author1._id };
        }
    
        const products = await Product.find(query).sort("name").limit(Number(limit)).skip(Number(offset));
        const product_count = await Product.find(query).countDocuments();
    
        // const user = await User.findById(id_user);
    
        if (!products) {
          res.status(404).json({ msg: "No existe el product" });
        }
    
        return res.json({products: products.map(product => product), product_count: product_count});
      } catch (error) {
        res.status(400).send({ message: "Some error occurred while retrieving products." });
      }
}//getall_products
async function getone_product(req, res) {
    try {
      const id = req.userId;

      const author = await User.findById(id).exec();
        const slug = req.params.slug
        const product = await Product.findOne({ slug: slug });
        if (!product) {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        } else {
          // const products = await product.toproductresponse(author);
          res.json(await product.toproductresponse(author));
          // console.log('products',products);
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
};//getone_product

async function create_product(req, res) {
    try {
      const id = req.userId;

    const author = await User.findById(id).exec();

        const product_data = {
            name: req.body.name || null,
            price: req.body.price || 0,
            description: req.body.description || null,
            id_category: req.body.id_category || null,
            name_cat: req.body.name_cat || null,
            state: req.body.state || null,
            location: req.body.location || null,
            product_images: req.body.product_images || null,
            author: req.body.author || null
        };
    console.log(product_data.id_category);
    // const { title, body, tagList } = req.body.article;

    // confirm data
    if ( !product_data ) {
        res.status(400).json({message: "All fields are required"});
    }
    const category = await Category.findOne({ slug: product_data.id_category });

    const product = new Product(product_data);
    product.author = id;
    await product.save();
    category.products.push(product._id);
    await category.save();
    res.json(await product.toproductresponse(author));
      } catch (error) {
        res.status(500).send({message: error.message || "Some error occurred while creating the Product."});
      }
}//create_product

readProductsWithCategory = asyncHandler(async (req, res) => {
   
const { slug } = req.params;
console.log(slug);

try {
  const category = await Category.findOne({ slug }).exec();
  console.log(category);

  if (!category) {
    return res.status(401).json({
      message: "Category Not Found"
    });
  }

  return await res.status(200).json({
    products: await Promise.all(category.products.map(async productId => {
        const productObj = await Product.findById(productId).exec();
        return await productObj;
    }))
})
} catch (error) {

  console.error(error);
  return res.status(500).json({
    message: "An error occurred"
  });
}

   });
  


async function delete_product(req, res) {
        try {
            const slug = req.params.slug;
            const product = await Product.findOne({ slug }).exec();
            if (!product) {
                return res.status(404).send({ message: `Cannot delete Product with slug=${slug}. Maybe Product was not found!` });
            }
    
            const category = await Category.findOne({ slug: product.category }).exec();
            if (category) {
                const index = category.products.removeProduct(product._id);
                if (index !== -1) {
                    category.products.splice(index, 1);
                    await category.save();
                }
            }
    
            await product.deleteOne();
            return res.send({ message: "Product was deleted successfully!" });
        } catch (error) {
            if (error.kind === 'ObjectId') {
                return res.status(404).send({ message: `Product not found!` });
            } else {
                return res.status(500).send({ message: "Could not delete that Product" });
            }
        }
    
}//delete_product

async function update_product(req, res) {
    const  userId  = req.userId;

    const { products } = req.body;

    if (!products) {
      return res.status(400).json({message: "Required a products object"});
    }
    const { slug } = req.params;

    const loginUser = await User.findById(userId).exec();

    const target = await Product.findOne({ slug }).exec();
    console.log("products.price",products);
    if (products.price) {
      console.log("products.price",products.price);
        target.price = products.price;
    }else {
      target.price = target.price;
    }
    if (products.description) {
        target.description = products.description;
    }else{
      target.description = target.description;
    }
    if (products.state) {
        target.state = products.state;
    }else {
      target.state =  target.state;
    }
  
    await target.save();
    // return res.status(200).json({
    //   products: res.json(await target.toproductresponse(loginUser))
    // });
    res.json(await target.toproductresponse(loginUser));
}//update_product

async function deleteAll_product(req, res) {
    try {
        const deleteALL = await Product.deleteMany();
        res.send({message: `Products were deleted successfully!`});
      } catch (error) {
        res.status(500).send({message: error.message || "Some error occurred while removing all products."});
      }
}//deleteAll_product

// Favorite a product
async function favorite  (req, res) {
  const id = req.userId;
  console.log(id);
  const { slug } = req.params;
  console.log(slug);
  const loginUser = await User.findById(id).exec();
  console.log(loginUser);
  if (!loginUser) {
      return res.status(401).json({
          message: "User Not Found"
      });
  }
  
  const product = await Product.findOne({slug}).exec();
  
  if (!product) {
      return res.status(401).json({
          message: "product Not Found"
      });
  }
  // console.log(`product info ${product}`);

  await loginUser.favorite(product._id);
  
  const updatedproduct = await product.updateFavoriteCount();

  return res.status(200).json({
    product: await updatedproduct.toproductresponse(loginUser)
  });
};

// Unfavorite a product
async function unfavorite (req, res) {
  const id = req.userId;
  console.log(id);
  const { slug } = req.params;
  console.log(slug);
  const loginUser = await User.findById(id).exec();
  console.log(loginUser);
  if (!loginUser) {
      return res.status(401).json({
          message: "User Not Found"
      });
  }

  const product = await Product.findOne({slug}).exec();

  if (!product) {
      return res.status(401).json({
          message: "product Not Found"
      });
  }

  await loginUser.unfavorite(product._id);

  await product.updateFavoriteCount();

  return res.status(200).json({
    product: await product.toproductresponse(loginUser)
  });
};

async function get_favorites (req, res)  {
  try {
    const id = req.userId;
  // console.log(id);
  const loginUser = await User.findById(id).exec();
  // console.log("loginUser",loginUser);
  if (!loginUser) {
      return res.status(401).json({
          message: "User Not Found"
      });
  }
    const products = await Product.find({_id: loginUser.favorites}).sort("name").populate("author");
    console.log("products",products);
    if (products) {
      console.log(products);
      return res.json( await products);

    } else {
      res.status(404).json({msg: "No products favorited"});
    }
  } catch (error) {
    res.status(500).json({msg: "An error has ocurred"});
  }
};

// async function find_products_user  (req, res) {
//   try {
//     const id = req.userId;
//     const user = await User.findById(id).exec();
//     // console.log(user);
//     if (!user) {
//       return res.status(401).json({
//         message: "User Not Found"
//       });
//     }

//     const products = await Product.find({ author: user._id }).exec();
//     // console.log('products',products);
//     if (!products) {
//       return res.status(404).json({
//         message: "Products Not Found"
//       });
//     }
//     // return res.json(products.map(product => product.toJSONAuthorFor(user)));
//     const productsWithFullData = await Promise.all(products.map(async product => {
//       return await product.toproductresponse(user);
//     }));

//     return res.status(200).json({ products });
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({message: "An error has ocurred"});
//   }
// }
// async function find_products_user  (req, res) {
//   // try {
//   //   const id = req.userId;
//   //   const user = await User.findById(id).exec();

//   //   if (!user) {
//   //     return res.status(401).json({
//   //       message: "User Not Found"
//   //     });
//   //   }

//   //   const products = await Product.find({ author: user._id }).exec();

//   //   if (!products) {
//   //     return res.status(404).json({
//   //       message: "Products Not Found"
//   //     });
//   //   }

//   //   const productsWithFullData = await Promise.all(products.map(async product => {
//   //     return await product.toproductresponse(user);
//   //   }));

//   //   return res.status(200).json({ products: productsWithFullData });
//   // } catch (error) {
//   //   console.error(error);
//   //   res.status(500).send({message: "An error has ocurred"});
//   // }
//   try {
//     const user = await User.findById(req.auth.id);
//     if (user) {
//       const products = await Product.find({ author: user._id }).sort("name").populate("author");
//       if (!products) {
//         res.status(404).send({message: `Product not found!`});
//       } else {
//         return res.json(products.map(product => product.toJSONAuthorFor(user)));
//       };
//     } else {
//       res.status(404).send({message: `User not found!`});
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).send({message: "An error has ocurred"});
//   }
// }
const product_controller = {
    getall_products: getall_products,
    getone_product: getone_product,
    create_product: create_product,
    delete_product: delete_product,
    update_product: update_product,
    deleteAll_product: deleteAll_product,
    readProductsWithCategory,
    favorite:favorite,
    unfavorite:unfavorite,
    get_favorites:get_favorites
    // find_products_user:find_products_user
}

module.exports = product_controller
// ---------------------------------------------------------------------------------
