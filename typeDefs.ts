import { gql } from "apollo-server-express";

export const typeDefs = gql`
type Article {
  id:ID,
  title:String,
  avartar:String,
  description:String
}
type Query{
  getArticles: [Article]
}
`