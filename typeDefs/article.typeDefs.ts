import { gql } from "apollo-server-express";

export const articleTypeDefs = gql`
type Article {
  id:ID,
  title:String,
  avatar:String,
  description:String,
  category:Category
}

type Query{
  getArticles(
    sortKey:String,
    sortValue:String,
    currentPage:Int = 1,
    limit:Int = 2,
    filterKey:String,
    filterValue:String,
    keyword:String
    ): [Article],
  getArticle(id:ID):Article
}

input ArticleInput{
  title:String,
  avatar:String,
  description:String,
  categoryId:String
}

type Mutation{
  createArticle(article:ArticleInput):Article,
  editArticle(id:ID,article:ArticleInput):Article,
  deleteArticle(id:ID):String
}`