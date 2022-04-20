import { compairPassword, createJWT } from "@lib/auth";
import prisma from "@lib/prisma";
import { getUser } from "@lib/auth";
import { hash } from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    const { oldPassword, newPassword } = req.body;
    if (!oldPassword || !newPassword) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid request!",
      });
    }
    const user = await getUser(req);
    if (!user) {
      return res.status(500).json({
        statusCode: 500,
        message: "User does not exist!",
      });
    }
    const isValid = await compairPassword(oldPassword, user.password);
    if (!isValid) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid current password!",
      });
    }
    try {
      const hashedPassword = await hash(newPassword, 10);
      const updateUser = await prisma.user.update({
        where: {
          email: user.email,
        },
        data: {
          password: hashedPassword,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Account updated successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
