"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.typeDefs = void 0;
const article_typeDefs_1 = require("./article.typeDefs");
const category_typeDefs_1 = require("./category.typeDefs");
const register_typeDefs_1 = require("./register.typeDefs");
exports.typeDefs = [article_typeDefs_1.articleTypeDefs, category_typeDefs_1.categoryTypeDefs, register_typeDefs_1.regiterTypeDefs];
