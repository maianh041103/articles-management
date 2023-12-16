import express, { Express, Router } from "express";
import dotenv from "dotenv";
import * as database from "./config/database";
import { ApolloServer } from "apollo-server-express";
import { typeDefs } from './typeDefs/index.typeDefs';
import { resolvers } from './resolvers/index.resolvers';
import { auth } from "./middlerware/auth.middlerware";

const startServer = async () => {

  dotenv.config();
  const app: Express = express();
  const port: number | string = process.env.PORT || 3000;

  const router: Router = express.Router();

  //Kết nối database
  database.connect();
  //End kết nối database

  //GQL
  app.use('/graphql', auth);

  const appoloServer = new ApolloServer({
    typeDefs,
    resolvers,
    introspection: true, //tự gợi ý các hàm trên graphql khi deploy online
    context: ({ req }) => req,
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