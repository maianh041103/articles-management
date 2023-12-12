import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  title: String,
  avatar: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
});

const Category = mongoose.model("Category", categorySchema, "categories");

export default Category;
