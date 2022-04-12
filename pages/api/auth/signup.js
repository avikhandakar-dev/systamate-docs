import { createJWT } from "@lib/auth";
import prisma from "@lib/prisma";
import { hash } from "bcryptjs";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid request!",
      });
    }
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });
    if (existingUser) {
      return res.status(500).json({
        statusCode: 500,
        message: "User already exists!",
      });
    }
    try {
      const hashedPassword = await hash(password, 10);
      const user = await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
      });
      const token = createJWT(user);
      return res.status(200).json({
        statusCode: 200,
        message: "Account created successfully!",
        data: { user, token },
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
