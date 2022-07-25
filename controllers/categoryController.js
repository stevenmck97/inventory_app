const Category = require("../models/category");
const async = require("async");
const { body, validationResult } = require("express-validator");

//Display list of all categories
exports.category_list = function (req, res, next) {
    Category.find()
        .sort([["name", "ascending"]])
        .exec(function (err, list_categories) {
            if (err) {
                return next(err);
            }
            //No error, render categories
            res.render("category_list", {
                title: "Category list",
                category_list: list_categories,
            });
        });
};
