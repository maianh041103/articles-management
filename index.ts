import express, { Express, Router } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer, gql } from "apollo-server-express";

const startServer = async () => {

  const typeDefs = gql`
    type Query{
      hello: String
    }
  `

  const resolvers = {
    Query: {
      hello: () => {
        return "helloWorld"
      }
    }
  }

  dotenv.config();
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  const router: Router = express.Router();

  //Kết nối database
  database.connect();
  //End kết nối database

  //GQL
  const appoloServer = new ApolloServer({
    typeDefs,
    resolvers
  })

  await appoloServer.start();

  appoloServer.applyMiddleware({
    app: app,
    path: "/graphql"
  })
  //End GQL

  app.listen(port, () => {
    console.log(`Port : ${port}`);
  })
}

startServer();