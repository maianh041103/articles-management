import User from "../models/user";
import md5 from "md5";
import * as generate from "../helper/generateRandom.helper";

export const registerResolvers = {
  Mutation: {
    regiterUser: async (_, args) => {
      const { user } = args;
      const emailExist = await User.findOne({
        email: user.email
      });
      if (emailExist) {
        return {
          code: 400,
          email: "Email đã tồn tại"
        }
      } else {
        user.token = generate.generateRandomString(30);
        user.password = md5(user.password);

        const data = new User(user);
        await data.save();

        return {
          code: 200,
          message: "Tạo tài khoản thành công",
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          token: data.token
        }
      }
    }
  }
}