import connectDB from "@/utils/mongoDB";
import Student from "@/models/student";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    await connectDB();
    const result = await request.json();
    const { studentEmail } = result;
    const student = await Student.findOne({ studentEmail });
    return student
      ? NextResponse.json({ isRegStudent: true })
      : NextResponse.json({ isRegStudent: false });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
