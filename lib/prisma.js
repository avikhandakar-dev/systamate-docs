import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

let prisma;

if (process.env.NODE_ENV === "production") {
  prisma = new PrismaClient();
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient();
  }
  prisma = global.prisma;
}

//Middleware
// prisma.$use(async (params, next) => {
//   if (params.action == "create" && params.model == "User") {
//     const user = params.args.data;
//     const hashedPassword = await hash(user.password, 10);
//     user.password = hashedPassword;
//     params.args.data = user;
//   }
//   return await next(params);
// });

export default prisma;
