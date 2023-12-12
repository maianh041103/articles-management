import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Article {
  id:ID,
  title:String,
  avatar:String,
  description:String
}

type Category{
  id:ID,
  title:String,
  avatar:String
}

type Query{
  getArticles: [Article],
  getArticle(id:ID):Article,
  getCategories:[Category],
  getCategory(id:ID):Category
}

input ArticleInput{
  title:String,
  avatar:String,
  description:String
}

input CategoryInput{
  title:String,
  avatar:String
}

type Mutation{
  createArticle(article:ArticleInput):Article,
  editArticle(id:ID,article:ArticleInput):Article,
  deleteArticle(id:ID):String,

  createCategory(category:CategoryInput):Category
  editCategory(id:ID,category:CategoryInput):Category
  deleteCategory(id:ID):String
}`