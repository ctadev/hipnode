import express from "express";

import { getUserById } from "../db/users";
import { verifyAccessToken } from "../helpers";

interface JwtPayload {
  id: number;
}

export const isAuthenticated = async (
  req: express.Request | any,
  res: express.Response,
  next: express.NextFunction
) => {
  let token;
  try {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader?.startsWith("Bearer")) {
      token = authHeader.split(" ")[1];
      const decoded = await verifyAccessToken(token);

      if (!decoded) {
        return res.status(401).send({ message: "User is not authorized" });
      }

      const { id } = decoded as JwtPayload;
      const user = await getUserById(id);
      req.user = user;
      next();
    } else {
      return res.status(403).json({ message: "Access denied" });
    }
  } catch (err: any) {
    return res.status(500).json({ message: `An error occured` });
  }
};
