import Article from "./models/articles"

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
    }
  },
  Mutation: {
    createArticle: async (_, args) => {
      const { article } = args;
      const record = new Article(article);
      await record.save();

      return record;
    }
  }
}