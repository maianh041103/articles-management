"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.categoryTypeDefs = (0, apollo_server_express_1.gql) `
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
}`;
