import {prisma} from "../server";
import { IPostReport } from "../types";


// get postreport by post_id and report_id
export const getPostReportByPostIdAndReportId = async (post_id:number, report_id:number) => {
    return prisma.postReport.findUnique({
        where: {
        post_id_report_id: {
            post_id,
            report_id,
        },
        },
    });
};

// get postreport by post_id
export const getReportsByPostId = async (id: number) => {
    return prisma.postReport.findMany({
        where: {
            post_id: id,
        },
    });
}

// get postreport by report_id
export const getPostsByReportId = async (id: number) => {
    return prisma.postReport.findMany({
        where: {
            report_id: id,
        },
    });
}

// create new postreport
export const createPostReport = async (postReport: IPostReport) => {
    return prisma.postReport.create({
        data: postReport,
    });
}