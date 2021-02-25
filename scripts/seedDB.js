const mongoose = require("mongoose");
const db = require("../models");

// This file empties the Books collection and inserts the books below

mongoose.connect(
    process.env.MONGODB_URI ||
    "mongodb://localhost/googlebooks"
);

const bookSeed = [
    {
        title: "The War of Art",
        authors: "Steven Pressfield",
        description:
            "Internationally bestselling author of Last of the Amazons, Gates of Fire, and Tides of War, Steven Pressfield delivers a guide to inspire and support those who struggle to express their creativity. Pressfield believes that “resistance” is the greatest enemy, and he offers many unique and helpful ways to overcome it.",
        image: "https://images-na.ssl-images-amazon.com/images/I/51rI-MXRwvL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg",
        link: "https://play.google.com/store/books/details?id=sR3hAAAAQBAJ&source=gbs_api"
    }
];

db.Book
    .remove({})
    .then(() => db.Book.collection.insertMany(bookSeed))
    .then(data => {
        console.log(data.result.n + " records inserted!");
        process.exit(0);
    })
    .catch(err => {
        console.error(err);
        process.exit(1);
    });
