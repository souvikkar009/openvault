import "@/utils/mongoDB";
import Project from "@/models/projects";
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoDB";

export async function GET(request, { params }) {
  let { name } = params;
  name = name.toLowerCase().replaceAll("+", " ");
  await connectDB();
  const projects = await Project.find({ instituteName: name });
  return NextResponse.json({ projects }, { status: 200 });
}
