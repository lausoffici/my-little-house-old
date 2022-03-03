import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Course from "models/Course";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await dbConnect();

  switch (req.method) {
    case "GET":
      try {
        const courses = await Course.find({});
        res.status(200).json({ courses });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    case "POST":
      try {
        const course = await Course.create(req.body);
        res.status(201).json({ course });
      } catch (error) {
        res.status(400).json(error);
      }
      break;

    default:
      res.status(404);
      break;
  }
}
