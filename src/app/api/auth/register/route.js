import connectDB from "@/utils/mongoDB";
import Student from "@/models/student";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    await connectDB();
    const reqBody = await request.json();
    const {
      studentName,
      studentEmail,
      studentPassword,
      instituteName,
      instituteId,
    } = reqBody;
    console.log(reqBody);
    const hashedPasswrod = await bcrypt.hash(studentPassword, 10);
    console.log(hashedPasswrod);

    await Student.create({
      studentName,
      studentEmail,
      studentPassword: hashedPasswrod,
      instituteName,
      instituteId,
    });
    return NextResponse.json(
      { message: "Student registration successful", success: true },
      { status: 201 }
    );
  } catch (err) {
    return NextResponse.json({ err, success: false }, { status: 500 });
  }
}
