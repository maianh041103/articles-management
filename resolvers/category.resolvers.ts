import Category from "../models/category";

export const categoryResolvers = {
  Query: {
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