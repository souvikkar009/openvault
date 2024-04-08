import connectDB from "@/utils/mongoDB";
import Project from "@/models/projects";
import { NextResponse } from "next/server";

export async function POST(request) {
  const {
    title,
    description,
    instituteId,
    instituteName,
    domainId,
    domainName,
  } = await request.json();
  await connectDB();
  await Project.create({
    title,
    description,
    instituteId,
    instituteName,
    domainId,
    domainName,
  });
  return NextResponse.json(
    { message: "Project Created Successfully" },
    { status: 201 }
  );
}

export async function GET() {
  await connectDB();
  const projects = await Project.find();
  return NextResponse.json({ projects });
}
