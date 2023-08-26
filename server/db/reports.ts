import { prisma } from "../server";
import { IReport } from "../types";

export const getAllReports = async () => {
  return prisma.report.findMany();
};

// set report
export const createNewReport = async (report: IReport) => {
  return prisma.report.create({
    data: report,
  });
};