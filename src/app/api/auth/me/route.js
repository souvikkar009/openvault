import { getDataFromToken } from "@/utils/getTokenData";
import { NextResponse } from "next/server";
import Student from "@/models/student";
import connectDB from "@/utils/mongoDB";

export async function GET(request) {
  try {
    await connectDB();
    const studentId = await getDataFromToken(request);
    if (!studentId) {
      return NextResponse.json({
        message: "User Not LoggedIn",
        isLoggedIn: false,
      });
    }
    const student = await Student.findOne({ _id: studentId }).select(
      "-studentPassword"
    );
    return student
      ? NextResponse.json({
          message: "User LoggedIn",
          isLoggedIn: true,
          student,
        })
      : NextResponse.json({
          message: "User not found",
          isLoggedIn: false,
          student,
        });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Server Error", success: false },
      { status: 400 }
    );
  }
}
