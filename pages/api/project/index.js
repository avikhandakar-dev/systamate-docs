import { getUser } from "@lib/auth";
import prisma from "@lib/prisma";

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      companyName,
      companyAbbreviation,
      companyProjectManager,
      projectName,
      applicationName,
      applicationAbbreviation,
      consultantName,
      applicationUsage,
      projectScope,
      startDate,
      endDate,
      reportingDate,
      hostname,
      ipAddress,
    } = req.body;
    if (
      !companyName ||
      !companyAbbreviation ||
      !companyProjectManager ||
      !projectName ||
      !applicationName ||
      !applicationAbbreviation ||
      !consultantName ||
      !applicationUsage ||
      !projectScope ||
      !startDate ||
      !endDate ||
      !reportingDate
    ) {
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

    try {
      const project = await prisma.project.create({
        data: {
          companyName,
          companyAbbreviation,
          companyProjectManager,
          projectName,
          applicationName,
          applicationAbbreviation,
          consultantName,
          applicationUsage,
          startDate,
          endDate,
          reportingDate,
          hostname,
          ipAddress,
          author: {
            connect: {
              id: user.id,
            },
          },
        },
      });

      const scope = await prisma.scope.create({
        data: {
          name: projectScope,
          project: {
            connect: {
              id: project.id,
            },
          },
        },
      });

      return res.status(200).json({
        statusCode: 200,
        message: "Project created successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else if (req.method === "GET") {
    const user = await getUser(req);
    if (!user) {
      return res.status(401).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    try {
      const projects = await prisma.project.findMany({
        where: {
          author: {
            id: user.id,
          },
        },
        include: {
          scopes: true,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Projects fetched successfully!",
        data: projects,
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
    try {
      const project = await prisma.project.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Project deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else {
    res.setHeader("Allow", "POST, GET, DELETE");
    res.status(405).end("Method Not Allowed");
  }
};
