import { compairPassword, createJWT } from "@lib/auth";
import prisma from "@lib/prisma";

export default async (req, res) => {
  if (req.method === "POST") {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid request!",
      });
    }
    const user = await prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      return res.status(500).json({
        statusCode: 500,
        message: "User does not exist!",
      });
    }
    const isValid = await compairPassword(password, user.password);
    if (!isValid) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid email or password!",
      });
    }
    const token = createJWT(user);
    return res.status(200).json({
      statusCode: 200,
      message: "Logged in successfully!",
      data: { user, token },
    });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};
