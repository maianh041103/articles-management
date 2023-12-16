"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.articleResolvers = void 0;
const articles_1 = __importDefault(require("../models/articles"));
const category_1 = __importDefault(require("../models/category"));
exports.articleResolvers = {
    Query: {
        getArticles: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { sortKey, sortValue, currentPage, limit, filterKey, filterValue, keyword } = args;
            const find = {
                deleted: false
            };
            const sort = {};
            if (sortKey && sortValue) {
                sort[sortKey] = sortValue;
            }
            const skip = limit * (currentPage - 1);
            if (filterKey && filterValue) {
                find[filterKey] = filterValue;
            }
            const keywordRegex = new RegExp(keyword);
            find["title"] = keywordRegex;
            const articles = yield articles_1.default.find(find).skip(skip).limit(limit).sort(sort);
            return articles;
        }),
        getArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            const article = yield articles_1.default.findOne({
                _id: id,
                deleted: false
            });
            return article;
        })
    },
    Article: {
        category: (article) => __awaiter(void 0, void 0, void 0, function* () {
            const category = yield category_1.default.findOne({
                _id: article.categoryId,
                deleted: false
            });
            return category;
        })
    },
    Mutation: {
        createArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { article } = args;
            const record = new articles_1.default(article);
            yield record.save();
            return record;
        }),
        editArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id, article } = args;
            yield articles_1.default.updateOne({
                _id: id,
            }, article);
            const newRecord = yield articles_1.default.findOne({
                _id: id
            });
            return newRecord;
        }),
        deleteArticle: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { id } = args;
            yield articles_1.default.updateOne({
                _id: id
            }, {
                deleted: true,
                deletedAt: new Date()
            });
            return "Xoa thanh cong";
        })
    }
};
