import prisma from "@lib/prisma";
import { getUser } from "@lib/auth";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, gender, phone, position, department, avatar } = req.body;
    if (!name || !gender || !phone || !position || !department) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid request!",
      });
    }
    const user = await getUser(req);
    if (!user) {
      return res.status(500).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    const profile = await prisma.profile.findUnique({
      where: {
        userId: user.id,
      },
    });

    try {
      if (name !== user.name) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            name,
          },
        });
      }
      if (!profile) {
        await prisma.profile.create({
          data: {
            gender,
            phone,
            position,
            department,
            avatar,
            user: {
              connect: {
                id: user.id,
              },
            },
          },
        });
      } else {
        await prisma.profile.update({
          where: {
            userId: user.id,
          },
          data: {
            gender,
            phone,
            position,
            department,
            avatar,
          },
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Profile updated successfully!",
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
