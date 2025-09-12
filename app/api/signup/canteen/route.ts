import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { CanteenModel } from "@/lib/models";
import bcrypt from "bcryptjs";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const body = await request.json();

    const requiredFields = [
      "businessName",
      "ownerName",
      "email",
      "password",
      "phone",
      "address",
      "licenseNumber",
      "cuisineTypes",
      "operatingHours",
      "seatingCapacity",
      "servingCapacity",
      "emergencyContactName",
      "emergencyContactPhone",
      "bankAccountNumber",
      "bankIFSC",
      "panNumber",
      "operatingHours.openTime",
      "operatingHours.closeTime",
    ];

    for (const field of requiredFields) {
      if (field.includes(".")) {
        const [parent, child] = field.split(".");
        if (!body[parent] || !body[parent][child]) {
          return NextResponse.json(
            { error: `${field} is required` },
            { status: 400 }
          );
        }
      } else if (
        !body[field] ||
        (Array.isArray(body[field]) && body[field].length === 0)
      ) {
        return NextResponse.json(
          { error: `${field} is required` },
          { status: 400 }
        );
      }
    }

    const existing = await CanteenModel.findOne({ email: body.email });
    if (existing)
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );

    const hashed = await bcrypt.hash(body.password, 10);
    body.password = hashed;
    body.avatarInitials = `${
      body.businessName
        ?.split(" ")
        ?.map((p: string) => p[0])
        .join("")
        .slice(0, 2) || ""
    }`.toUpperCase();

    const canteen = await CanteenModel.create(body);
    return NextResponse.json({ id: canteen._id }, { status: 201 });
  } catch (e: any) {
    if (e?.code === 11000) {
      return NextResponse.json(
        { error: "Email already registered" },
        { status: 409 }
      );
    }
    return NextResponse.json(
      { error: e?.message || "Server error" },
      { status: 500 }
    );
  }
}
