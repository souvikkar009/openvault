import Domain from "@/models/domain";
import { NextResponse } from "next/server";
import connectDB from "@/utils/mongoDB";

export async function GET(request, { params }) {
  let { name } = params;
  await connectDB();
  name = name.replaceAll("+", " ");
  const domain = await Domain.findOne({ domainName: name });
  if (domain) {
    return NextResponse.json({
      domainId: domain._id,
      domainName: domain.domainName,
      isDomainExists: true,
    });
  } else {
    return NextResponse.json({ isDomainExists: false });
  }
}
