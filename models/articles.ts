import mongoose from 'mongoose';

const articlesSchema = new mongoose.Schema({
  title: String,
  avartar: String,
  description: String,
  deleted: {
    type: Boolean,
    default: false
  },
  deletedAt: Date
});

const Article = mongoose.model("Article", articlesSchema, "articles");

export default Article;