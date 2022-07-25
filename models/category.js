import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true },
});

CategorySchema.virtual("url").get(function () {
    return "/inventory/category" + this._id;
});
