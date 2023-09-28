const Category = require("../models/category.model.js");

// Create and Save a new Category
async function create_category (req, res) {
  try {
    const category_data = {
      id_cat: req.body.id_cat || null,
      category_name: req.body.category_name || null,
      image: req.body.image || null,
      products: []
    };
    const category = new Category(category_data);
    const new_category = await category.save();
    res.json(new_category);
  } catch (error) {
    res.status(500).send({message: error.message || "Some error occurred while creating the Category."});
  }
};

// Retrieve all Category from the database.
async function findAll_category (req, res) {
  try {
    const { offset, limit } = req.query;
    const categories = await Category.find({}, {}, { skip: Number(offset), limit: Number(limit) }).populate('products');
    res.json(categories.map(category => category.tocategoryresponse()));
    // res.json(categories);
  } catch (error) {
    res.status(400).send({ message: "Some error occurred while retrieving categorys." });
  }
}

async function findOne_category  (req, res){
  try {
      const slug = req.params.slug
      const category = await Category.findOne({ slug: slug }).populate('products');
      if (!category) {
          res.status(404).send({message: `Category not found!`});
      } else {
          res.json(category.tocategoryresponse());
      };
  } catch (error) {
    console.log(error);
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Category not found!`}); }
      else {res.status(500).send({message: "An error has ocurred"});}
  }
};

// // Update a Category by the slug in the request
async function update_category (req, res){
  try {
      const slug = req.params.slug
      const old_category = await Category.findOne({ slug: slug });

      if (old_category.name !== req.body.name && req.body.name !== undefined) {
        old_category.slug = null;
        // console.log('error');
      }

      old_category.id_cat = req.body.id_cat || old_category.id_cat;
      old_category.category_name = req.body.category_name || old_category.category_name;
      old_category.image = req.body.image || old_category.image;
      old_category.products = req.body.products || old_category.products;
      const category = await old_category.save();

      if (!category) {res.status(404).send({message: `Cannot update Category with slug=${slug}. Maybe Category was not found!`}); }
      res.send({ message: "Category was updated successfully." });
  } catch (error) {
      if (error.kind === 'ObjectId') {res.status(404).send({message: `Category not found!`}); }
      else {res.status(500).send({message: "Error updating the Category"});}
  }
}

// // Delete a Category with the specified slug in the request
async function delete_category  (req, res) {
  try {
    const slug = req.params.slug
    const categorie = await Category.findOneAndDelete({ slug });
    if (!categorie) {res.status(404).send({ message: `Cannot delete Category with slug=${slug}. Maybe Category was not found!`}); }
    res.send({message: "Category was deleted successfully!"});
  } catch (error) {
    if (error.kind === 'ObjectId') {res.status(404).send({ message: `Category not found!`}); }
    else { res.status(500).send({ message: "Could not delete that category" }); }
  }
}

async function deleteAll_categories (req, res) {
  try {
    const deleteALL = await Category.deleteMany();
    res.send({message: `Categories were deleted successfully!`});
  } catch (error) {
    res.status(500).send({message: err.message || "Some error occurred while removing all category."});
  }
}

const category_controller = {
  create_category:create_category,
  findAll_category:findAll_category,
  findOne_category:findOne_category,
  update_category:update_category,
  delete_category:delete_category,
  deleteAll_categories:deleteAll_categories
}

module.exports = category_controller