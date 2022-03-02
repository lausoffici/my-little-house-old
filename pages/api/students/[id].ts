import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "utils/dbConnect";
import Student from "models/Student";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const {
    query: { id },
    method,
  } = req;

  await dbConnect();

  switch (method) {
    case "GET":
      try {
        const student = await Student.findById(id);
        if (!student) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "PUT":
      try {
        const student = await Student.findByIdAndUpdate(id, req.body, {
          new: true,
          runValidators: true,
        });
        if (!student) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ student });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    case "DELETE":
      try {
        const deletedStudent = await Student.deleteOne({ _id: id });
        if (!deletedStudent) {
          return res.status(400).json({ success: false });
        }
        res.status(200).json({ success: true });
      } catch (error) {
        res.status(400).json({ success: false });
      }
      break;

    default:
      res.status(404);
      break;
  }
}
