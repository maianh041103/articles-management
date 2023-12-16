"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regiterTypeDefs = void 0;
const apollo_server_express_1 = require("apollo-server-express");
exports.regiterTypeDefs = (0, apollo_server_express_1.gql) `
  type User{
    id:ID
    fullName:String,
    email:String,
    token:String,
    code:Int,
    message:String
  }

  input RegisterUserInput {
    fullName:String,
    email:String,
    password:String,
  }

  input LoginUserInput{
    email:String,
    password:String
  }

  type Mutation{
    regiterUser(user:RegisterUserInput ):User,
    loginUser(user:LoginUserInput):User,
  }

  type Query{
    getUser:User
  }

`;
