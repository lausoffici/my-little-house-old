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
      try {
        const students = await Student.find({})
          .collation({ locale: "es" })
          .sort({ lastName: "asc" });
        res.status(200).json({ students });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      try {
        const student = await Student.create(req.body);
        res.status(201).json({ student });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    default:
      res.status(404);
      break;
  }
}
