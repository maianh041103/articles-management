import { gql } from "apollo-server-express";

export const regiterTypeDefs = gql`
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
    loginUser(user:LoginUserInput):User
  }

`