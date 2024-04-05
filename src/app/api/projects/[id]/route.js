import "@/utils/mongoDB";
import Project from "@/models/projects";
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoDB";

export async function GET(request, { params }) {
  const { id } = params;
  await connectDB();
  const project = await Project.findById({ _id: id });
  return NextResponse.json({ project }, { status: 200 });
}
