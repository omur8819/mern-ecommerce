const Category = require('../models/Category');
const { validationResult } = require('express-validator');

exports.addCategory = async (req, res) => {
    try {
        const { categoryName, description } = req.body;

        //fied validation
        const validationErr = validationResult(req);
        if (validationErr.errors.length > 0) {
            return res.status(400).json({ errors: validationErr.array() });
        }

        // category exist check
        const existCategory = await Category.findOne({ categoryName: categoryName });
        if (existCategory) {
            return res.status(400).json({ errors: [{ message: "Category already exists" }] })
        }

        //save category
        const category = new Category({
            categoryName: categoryName,
            description: description
        });

        // const category = new Category(req.body);
        const addedCategory = await category.save({ new: true });
        // res.status(200).send('Category added');
        res.status(200).json(addedCategory);
    }
    catch (err) {
        return res.status(500).json({ errors: [{ message: err.message }] });
    }
}


exports.getCategory = async (req, res) => {
    try {
        const category = await Category.findById({ _id: req.params.id });
        res.status(200).json(category);

    }
    catch (err) {
        return res.status(500).json({ errors: [{ message: err.message }] });
    }

}

exports.updateCategory = async (req, res) => {

    try {
        // validation
        const validationErr = validationResult(req);
        if (validationErr.errors.length > 0) {
            return res.status(400).json({ errors: validationErr.array() });
        }

        //update
        const updatedCategory = await Category.findOneAndUpdate(
            { _id: req.body.id },
            {
                // categoryName: req.body.categoryName,
                // description: req.body.description,
                ...req.body,
                status: 'updated',
                updatedDate: Date.now(),
            },
            {
                new: true,
                runValidators: true,
            }
        );

        // res.status(200).send('Category updated ')
        res.status(200).json(updatedCategory);

    } catch (err) {
        return res.status(500).json({ errors: [{ message: err.message }] });
    }
}

exports.deleteCategory = async (req, res) => {
    try {

        const deletedCategory = await Category.findOneAndUpdate(
            { _id: req.params.id },
            {
                status: 'deleted',
                deletedDate: Date.now(),
            },
            {
                new: true,
            }
        );
        res.status(200).json(deletedCategory);
        // res.status(200).send('category Deleted ');

    }
    catch (err) {
        return res.status(500).json({ errors: [{ message: err.message }] });
    }
}

exports.getCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).where('status', /[^deleted]/);
        res.status(200).json(categories);
    }
    catch (err) {

        return res.status(500).json({ errors: [{ message: err.message }] });
    }
}

exports.destroyCategory = async (req, res) => {
    try {
        await Category.deleteOne({ _id: req.params.id });
        res.status(200).send('Data is deleted');
    }
    catch (err) {
        return res.status(500).json({ errors: [{ message: err.message }] });
    }
}