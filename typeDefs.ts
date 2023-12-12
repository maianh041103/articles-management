import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Article {
  id:ID,
  title:String,
  avartar:String,
  description:String
}

type Query{
  getArticles: [Article],
  getArticle(id:ID):Article
}

input ArticleInput{
  title:String,
  avartar:String,
  description:String
}

type Mutation{
  createArticle(article:ArticleInput):Article,
  editArticle(id:ID,article:ArticleInput):Article,
  deleteArticle(id:ID):String
}`