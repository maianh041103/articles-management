"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.registerResolvers = void 0;
const user_1 = __importDefault(require("../models/user"));
const md5_1 = __importDefault(require("md5"));
const generate = __importStar(require("../helper/generateRandom.helper"));
exports.registerResolvers = {
    Mutation: {
        regiterUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { user } = args;
            const emailExist = yield user_1.default.findOne({
                email: user.email
            });
            if (emailExist) {
                return {
                    code: 400,
                    email: "Email đã tồn tại"
                };
            }
            else {
                user.token = generate.generateRandomString(30);
                user.password = (0, md5_1.default)(user.password);
                const data = new user_1.default(user);
                yield data.save();
                return {
                    code: 200,
                    message: "Tạo tài khoản thành công",
                    id: data.id,
                    fullName: data.fullName,
                    email: data.email,
                    token: data.token
                };
            }
        }),
        loginUser: (_, args) => __awaiter(void 0, void 0, void 0, function* () {
            const { email, password } = args.user;
            const emailExists = yield user_1.default.findOne({
                email: email
            });
            if (!emailExists) {
                return {
                    code: 400,
                    message: "Email không hợp lệ"
                };
            }
            else {
                if (emailExists.password != (0, md5_1.default)(password)) {
                    return {
                        code: 400,
                        message: "Mật khẩu không chính xác"
                    };
                }
                else {
                    return {
                        code: 200,
                        message: "Đăng nhập thành công",
                        token: emailExists.token
                    };
                }
            }
        })
    },
    Query: {
        getUser: (_, args, context) => __awaiter(void 0, void 0, void 0, function* () {
            if (context["user"]) {
                return {
                    code: 200,
                    message: "Thành công",
                    fullName: context["user"].fullName,
                    email: context["user"].email,
                    token: context["user"].token
                };
            }
            else {
                return {
                    code: 400,
                    message: "Thất bại"
                };
            }
        })
    }
};
