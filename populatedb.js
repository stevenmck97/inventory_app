#! /usr/bin/env node

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
const async = require("async");
const Category = require("./models/category");

var mongoose = require("mongoose");
var mongoDB = process.env.MONGO_DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

const categories = [];

function categoryCreate(name, description, cb) {
    categorydetail = {
        name: name,
        description: description,
    };

    const category = new Category(categorydetail);
    category.save(function (err) {
        if (err) {
            cb(err, null);
            return;
        }
        console.log("New Category: " + category);
        categories.push(category);
        cb(null, category);
    });
}

function createBooks(cb) {
    async.parallel(
        [
            function (callback) {
                categoryCreate(
                    "Movies",
                    "This category contains a list of movies",
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    "TV",
                    "This category contains a list of tv shows",
                    callback
                );
            },
            function (callback) {
                categoryCreate(
                    "Anime",
                    "This category contains a list of anime",
                    callback
                );
            },
        ],
        // optional callback
        cb
    );
}

// async.series(
//     [createGenreAuthors, createBooks, createBookInstances],
//     // Optional callback
//     function (err, results) {
//         if (err) {
//             console.log("FINAL ERR: " + err);
//         } else {
//             console.log("BOOKInstances: " + bookinstances);
//         }
//         // All done, disconnect from database
//         mongoose.connection.close();
//     }
// );

createBooks(function (err, results) {
    if (err) {
        console.log("FINAL ERR: " + err);
    } else {
        console.log("Categories: " + categories);
    }
    // All done, disconnect from database
    mongoose.connection.close();
});
