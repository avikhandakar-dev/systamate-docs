import { getUser } from "@lib/auth";
import prisma from "@lib/prisma";

export default async (req, res) => {
  if (req.method === "POST") {
    const { name, projectId } = req.body;
    if (!name || !projectId) {
      return res.status(500).json({
        statusCode: 500,
        message: "Invalid request!",
      });
    }

    const user = await getUser(req);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
      },
      include: {
        scopes: true,
      },
    });

    if (!project) {
      return res.status(500).json({
        statusCode: 500,
        message: "Project not found!",
      });
    }

    if (project.authorId !== user.id) {
      return res.status(500).json({
        statusCode: 500,
        message: "You are not owner of this project!",
      });
    }

    const existingScopeName = project.scopes.find(
      (scope) => scope.name === name
    );

    if (existingScopeName) {
      return res.status(500).json({
        statusCode: 500,
        message: "Scope already exists!",
      });
    }

    try {
      await prisma.scope.create({
        data: {
          name,
          authorId: user.id,
          project: {
            connect: {
              id: projectId,
            },
          },
        },
      });

      return res.status(200).json({
        statusCode: 200,
        message: "Scope created successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else if (req.method === "DELETE") {
    const { id } = req.body;
    const user = await getUser(req);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    const scope = await prisma.scope.findUnique({
      where: {
        id,
      },
    });
    if (!scope) {
      return res.status(500).json({
        statusCode: 500,
        message: "Scope not found!",
      });
    }
    if (scope.authorId !== user.id) {
      return res.status(500).json({
        statusCode: 500,
        message: "You are not owner of this scope!",
      });
    }
    try {
      await prisma.scope.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Scope deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else {
    res.setHeader("Allow", "POST, DELETE");
    res.status(405).end("Method Not Allowed");
  }
};
