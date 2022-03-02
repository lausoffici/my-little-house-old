import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Student from "models/Student";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      const students = await Student.find({});
      res.status(200).json({ students });
      break;
  }
}
