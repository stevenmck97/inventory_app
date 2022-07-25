import mongoose, { model } from "mongoose";

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, required: true, maxLength: 50 },
    description: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true },
    price: { type: Number, required: true },
    num_in_stock: { type: Number, required: true },
});

ItemSchema.virtual("url").get(function () {
    return "/inventory/item/" + this._id;
});

module.exports = mongoose.model("Item", ItemSchema);
