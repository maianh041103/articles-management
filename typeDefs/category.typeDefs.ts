import { gql } from "apollo-server-express";

export const categoryTypeDefs = gql`
type Category{
  id:ID,
  title:String,
  avatar:String
}

type Query{
  getCategories:[Category],
  getCategory(id:ID):Category
}

input CategoryInput{
  title:String,
  avatar:String
}

type Mutation{
  createCategory(category:CategoryInput):Category
  editCategory(id:ID,category:CategoryInput):Category
  deleteCategory(id:ID):String
}`