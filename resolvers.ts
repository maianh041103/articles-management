import Article from "./models/articles"
import Category from "./models/category";

export const resolvers = {
  Query: {
    getArticles: async () => {
      const articles = await Article.find({
        deleted: false
      })

      return articles;
    },
    getArticle: async (_, args) => {
      const { id } = args;

      const article = await Article.findOne({
        _id: id,
        deleted: false
      })
      return article;
    },

    getCategories: async () => {
      const categories = await Category.find({
        deleted: false
      });
      return categories;
    },
    getCategory: async (_, args) => {
      const { id } = args;
      const category = await Category.findOne({
        _id: id,
        deleted: false
      });
      return category;
    }
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;
      const record = new Article(article);
      await record.save();

      return record;
    },
    editArticle: async (_, args) => {
      const { id, article } = args;
      await Article.updateOne({
        _id: id,
      }, article);
      const newRecord = await Article.findOne({
        _id: id
      });
      return newRecord;
    },
    deleteArticle: async (_, args) => {
      const { id } = args;
      await Article.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });
      return "Xoa thanh cong";
    },

    createCategory: async (_, args) => {
      const { category } = args;
      const record = new Category(category);
      await record.save();
      return record;
    },
    editCategory: async (_, args) => {
      const { id, category } = args;
      await Category.updateOne({
        _id: id
      }, category);
      const newRecord = await Category.findOne({
        _id: id,
        deleted: false
      });
      return newRecord;
    },
    deleteCategory: async (_, args) => {
      const { id } = args;
      await Category.updateOne({
        _id: id
      }, {
        deleted: true,
        deletedAt: new Date()
      });
      return "Da xoa";
    }
  }
}