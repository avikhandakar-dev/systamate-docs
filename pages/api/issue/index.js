import { getUser } from "@lib/auth";
import prisma from "@lib/prisma";

export default async (req, res) => {
  if (req.method === "POST") {
    const {
      title,
      riskRating,
      impactRating,
      likelihoodRating,
      CVERating,
      CVSSRating,
      CVSSVector,
      affectedHost,
      observation,
      implication,
      remediation,
      screenshot,
      managementComments,
      targetResolutionDate,
      status,
      dateRaised,
      DTOwner,
      projectOwner,
      DTFollowUpDate,
      followUpComments,
      DTFollowUpStatus,
      scopeId,
      projectId,
    } = req.body;
    if (
      !title ||
      !riskRating ||
      !impactRating ||
      !likelihoodRating ||
      !status ||
      !DTFollowUpStatus ||
      !scopeId ||
      !projectId
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

    const project = await prisma.project.findUnique({
      where: {
        id: projectId,
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
        statusCode: 401,
        message: "Unauthorized!",
      });
    }

    try {
      await prisma.issue.create({
        data: {
          title,
          riskRating,
          impactRating,
          likelihoodRating,
          CVERating,
          CVSSRating,
          CVSSVector,
          affectedHost,
          observation,
          implication,
          remediation,
          screenshot,
          managementComments,
          targetResolutionDate,
          status,
          dateRaised,
          DTOwner,
          projectOwner,
          DTFollowUpDate,
          followUpComments,
          DTFollowUpStatus,
          authorId: user.id,
          scope: {
            connect: {
              id: scopeId,
            },
          },
        },
      });

      return res.status(200).json({
        statusCode: 200,
        message: "Issue created successfully!",
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
    const issue = await prisma.issue.findUnique({
      where: {
        id,
      },
    });
    if (!issue) {
      return res.status(500).json({
        statusCode: 500,
        message: "Issue not found!",
      });
    }
    if (issue.authorId !== user.id) {
      return res.status(500).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    try {
      await prisma.issue.delete({
        where: {
          id: id,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Issue deleted successfully!",
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        statusCode: 500,
        message: "Internal server error!",
      });
    }
  } else if (req.method === "PUT") {
    const {
      title,
      riskRating,
      impactRating,
      likelihoodRating,
      CVERating,
      CVSSRating,
      CVSSVector,
      affectedHost,
      observation,
      implication,
      remediation,
      screenshot,
      managementComments,
      targetResolutionDate,
      status,
      dateRaised,
      DTOwner,
      projectOwner,
      DTFollowUpDate,
      followUpComments,
      DTFollowUpStatus,
      id,
    } = req.body;

    if (
      !title ||
      !riskRating ||
      !impactRating ||
      !likelihoodRating ||
      !status ||
      !DTFollowUpStatus ||
      !id
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
    const issue = await prisma.issue.findUnique({
      where: {
        id,
      },
    });
    if (!issue) {
      return res.status(500).json({
        statusCode: 500,
        message: "Issue not found!",
      });
    }
    if (issue.authorId !== user.id) {
      return res.status(500).json({
        statusCode: 401,
        message: "Unauthorized!",
      });
    }
    try {
      await prisma.issue.update({
        where: {
          id: id,
        },
        data: {
          title,
          riskRating,
          impactRating,
          likelihoodRating,
          CVERating,
          CVSSRating,
          CVSSVector,
          affectedHost,
          observation,
          implication,
          remediation,
          screenshot,
          managementComments,
          targetResolutionDate,
          status,
          dateRaised,
          DTOwner,
          projectOwner,
          DTFollowUpDate,
          followUpComments,
          DTFollowUpStatus,
        },
      });
      return res.status(200).json({
        statusCode: 200,
        message: "Issue updated successfully!",
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
