import Institute from "@/models/institute";
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoDB";

export async function GET(request, { params }) {
  let { name } = params;
  await connectDB();
  name = name.replaceAll("+", " ");
  const institute = await Institute.findOne({ instituteName: name });
  if (institute) {
    return NextResponse.json({
      instituteId: institute._id,
      instituteName: institute.instituteName,
      isInstituteExists: true,
    });
  } else {
    return NextResponse.json({ isInstituteExists: false });
  }
}
