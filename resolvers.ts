import Article from "./models/articles"

export const resolvers = {
  Query: {
    getArticles: async () => {
      const articles = await Article.find({
        deleted: false
      })

      return articles;
    }
  }
}