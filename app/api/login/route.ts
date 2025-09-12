import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { StudentModel, TeacherModel } from "@/lib/models";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const { email, password, role } = await request.json();

    if (!email || !password || !role) {
      return NextResponse.json(
        { error: "Missing credentials" },
        { status: 400 }
      );
    }

    const Model = role === "student" ? StudentModel : TeacherModel;
    const user = await Model.findOne({ email });
    if (!user)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    const ok = await bcrypt.compare(password, user.password);
    if (!ok)
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );

    return NextResponse.json({
      id: String(user._id),
      name: `${user.firstName || ""} ${user.lastName || ""}`.trim(),
      email: user.email,
      role,
      avatarInitials: user.avatarInitials || "",
    });
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
