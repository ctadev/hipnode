import express from 'express';

import {createNewReport, getAllReports} from '../db/reports'

// @desc Get reports
// @route GET /reports/
// @access public
export const getReports = async (
    req: express.Request | any,
    res: express.Response
  ) => {
    try {
      const reports = await getAllReports();
      if (!reports.length) {
        return res.status(404).json({ message: "Reports not found" });
      }
  
      return res.status(200).json(reports);
    } catch (err: any) {
      return res
        .status(500)
        .json({ message: `An error occured: ${err.message}` });
    }
  };

// @desc Create report
// @route POST /reports
// @access private
export const createReport = async (
  req: express.Request | any,
  res: express.Response
) => {
  try {
    const { reason, username } = req.body;
    if (!reason || !username) {
      return res.status(400).json({ message: "Invalid reason or username" });
    }

    const report = await createNewReport({
      reason,
      username,
    });

    if (!report) {
      return res.status(400).json({ message: "Unable to create report" });
    }

    return res.status(200).json(report);

  } catch (error) {
    return res
      .status(500)
      .json({ message: `An error occured` });
  }
};