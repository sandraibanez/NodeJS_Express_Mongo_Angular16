const router = require('express').Router();

const categories = require('../../controllers/category.controller.js');
  
//api/categories
router.post('/', categories.create_category);
router.get('/', categories.findAll_category);
router.get('/:slug', categories.findOne_category);
router.put('/:slug', categories.update_category);
router.delete('/:slug', categories.delete_category);
router.delete('/', categories.deleteAll_categories);

module.exports = router;