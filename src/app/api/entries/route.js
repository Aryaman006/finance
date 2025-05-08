import { connectToDB } from "@/lib/mongodb";
import Entry from "@/models/Entry";

export async function GET() {
  await connectToDB();
  const entries = await Entry.find().sort({ createdAt: -1 });
  return Response.json(entries);
}

export async function POST(req) {
  const data = await req.json();
  console.log(data);
  
  await connectToDB();
  const entry = await Entry.create(data);
  return Response.json(entry);
}

