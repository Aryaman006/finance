import { connectToDB } from "@/lib/mongodb";
import Entry from "@/models/Entry";

export async function DELETE(req, { params }) {
  const { id } = params;
  console.log();
  
  await connectToDB();
  await Entry.findByIdAndDelete(id);
  return Response.json({ message: "Deleted" });
}
