import connectDB from "@/utils/mongoDB";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req) {
  try {
    await connectDB();
    const reqBody = await req.json();
    const { studentEmail, studentPassword } = reqBody;
    const student = await Student.findOne({ studentEmail });

    const validPassword = await bcrypt.compare(
      studentPassword,
      student.studentPassword
    );

    if (!validPassword) {
      return NextResponse.json({
        message: "Invalid Credentials",
        success: false,
      });
    }

    const tokenData = {
      studentId: student._id,
      studentEmail: student.studentEmail,
      studentName: student.studentName,
    };

    const token = jwt.sign(tokenData, process.env.TOKEN_SECRET, {
      expiresIn: "1d",
    });

    const response = NextResponse.json({
      message: "Student Login Successful",
      success: true,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
    });
    return response;
  } catch (error) {
    return NextResponse.json(
      { message: "server error", success: false },
      { status: 500 }
    );
  }
}
