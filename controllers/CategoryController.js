const Category = require("../models/Category");
const { validationResult } = require('express-validator');

exports.addCategory = async (req, res) => {
    const { categoryName, description } = req.body;

    //field validation
    const validationErr = validationResult(req);
    if(validationErr.errors.length > 0){
        return res.status(400).json({errors: validationErr.array()});
    }

    //category exists check
    const existCategory = await Category.findOne({categoryName: categoryName});
    if(existCategory){
        return res.status(400).json({errors: [{message: "Category already exists"}] });
    }

    //save category
    const category = new Category({
        categoryName: categoryName,
        description: description
    });

    // const category = new Category(req.body);

    const addedCategory = await category.save({new: true});
    //res.status(200).send("Category added successfully");
    res.status(200).json(addedCategory);
}

exports.getCategory = async (req, res) => {
    
}
exports.updateCategory = async (req, res) => {

}
exports.deleteCategory = async (req, res) => {

}
exports.getCategories = async (req, res) => {

}