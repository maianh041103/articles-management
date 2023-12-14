import { articleResolvers } from "./article.resolvers";
import { categoryResolvers } from "./category.resolvers";
import { registerResolvers } from "./register.resolvers";

export const resolvers = [articleResolvers, categoryResolvers, registerResolvers];