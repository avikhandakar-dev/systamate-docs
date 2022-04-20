import { getUser } from "@lib/auth";
import prisma from "@lib/prisma";

export default async (req, res) => {
  if (req.method === "GET") {
    const { id } = req.query;
    const user = await getUser(req);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    try {
      const scope = await prisma.scope.findUnique({
        where: {
          id,
        },
        include: {
          issues: true,
        },
      });
      if (!scope) {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid request!",
        });
      }

      const project = await prisma.project.findUnique({
        where: {
          id: scope.projectId,
        },
      });
      if (!project) {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid request!",
        });
      }

      if (project.authorId !== user.id) {
        return res.status(500).json({
          statusCode: 500,
          message: "Invalid request!",
        });
      }
      return res.status(200).json({
        statusCode: 200,
        message: "Project fetched successfully!",
        data: { scope: scope || {}, project: project || {} },
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else {
    res.setHeader("Allow", "GET");
    res.status(405).end("Method Not Allowed");
  }
};
