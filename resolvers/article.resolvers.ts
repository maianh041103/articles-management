import Article from "../models/articles"
import Category from "../models/category";

export const articleResolvers = {
  Query: {
    getArticles: async (_, args) => {
      const { sortKey, sortValue, currentPage, limit, filterKey, filterValue, keyword } = args;

      const find = {
        deleted: false
      };

      //Sort
      const sort = {};
      if (sortKey && sortValue) {
        sort[sortKey] = sortValue
      }
      //End sort

      //Pagination
      const skip = limit * (currentPage - 1);
      //End Pagination

      //Filter
      if (filterKey && filterValue) {
        find[filterKey] = filterValue;
      }
      //End Filter

      //Search
      const keywordRegex = new RegExp(keyword);
      find["title"] = keywordRegex;
      //End search

      const articles = await Article.find(find).skip(skip).limit(limit).sort(sort);

      return articles;
    },

    getArticle: async (_, args) => {
      const { id } = args;

      const article = await Article.findOne({
        _id: id,
        deleted: false
      })
      return article;
    }
  },

  Article: {
    category: async (article) => {
      const category = await Category.findOne({
        _id: article.categoryId,
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
    }
  }
}