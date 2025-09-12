import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { ResourceModel } from "@/lib/models";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// GET - Fetch all resources
export async function GET(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');
    const subject = searchParams.get('subject');
    const course = searchParams.get('course');
    const status = searchParams.get('status');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');

    // Build query
    let query: any = {};
    if (category) query.category = category;
    if (subject) query.subject = subject;
    if (course) query.course = course;
    if (status) query.status = status;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { author: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const resources = await ResourceModel.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await ResourceModel.countDocuments(query);

    return NextResponse.json({
      resources,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error: any) {
    console.error("Error fetching resources:", error);
    return NextResponse.json(
      { error: error.message || "Failed to fetch resources" },
      { status: 500 }
    );
  }
}

// POST - Create new resource
export async function POST(request: Request) {
  try {
    await connectToDatabase();
    const resourceData = await request.json();

    const {
      title,
      description,
      category,
      subject,
      course,
      semester,
      fileUrl,
      fileSize,
      fileName,
      linkUrl,
      author,
      uploadedBy,
      isPublic,
      status,
      tags,
      difficulty
    } = resourceData;

    // Validation
    if (!title || !description || !category || !uploadedBy) {
      return NextResponse.json(
        { error: "Required fields: title, description, category, uploadedBy" },
        { status: 400 }
      );
    }

    const newResource = await ResourceModel.create({
      title,
      description,
      category,
      subject: subject || '',
      course: course || '',
      semester: semester || '',
      fileUrl: fileUrl || '',
      fileSize: fileSize || null,
      fileName: fileName || '',
      linkUrl: linkUrl || '',
      author: author || '',
      uploadedBy,
      downloadCount: 0,
      isPublic: isPublic !== undefined ? isPublic : true,
      status: status || 'active',
      tags: tags || [],
      difficulty: difficulty || null
    });

    return NextResponse.json({
      message: "Resource created successfully",
      resource: newResource
    });
  } catch (error: any) {
    console.error("Error creating resource:", error);
    return NextResponse.json(
      { error: error.message || "Failed to create resource" },
      { status: 500 }
    );
  }
}

// PUT - Update resource
export async function PUT(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const resourceId = searchParams.get('id');
    
    if (!resourceId) {
      return NextResponse.json(
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }

    const updateData = await request.json();

    const updatedResource = await ResourceModel.findByIdAndUpdate(
      resourceId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Resource updated successfully",
      resource: updatedResource
    });
  } catch (error: any) {
    console.error("Error updating resource:", error);
    return NextResponse.json(
      { error: error.message || "Failed to update resource" },
      { status: 500 }
    );
  }
}

// DELETE - Delete resource
export async function DELETE(request: Request) {
  try {
    await connectToDatabase();
    const { searchParams } = new URL(request.url);
    const resourceId = searchParams.get('id');
    
    if (!resourceId) {
      return NextResponse.json(
        { error: "Resource ID is required" },
        { status: 400 }
      );
    }

    const deletedResource = await ResourceModel.findByIdAndDelete(resourceId);

    if (!deletedResource) {
      return NextResponse.json(
        { error: "Resource not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      message: "Resource deleted successfully"
    });
  } catch (error: any) {
    console.error("Error deleting resource:", error);
    return NextResponse.json(
      { error: error.message || "Failed to delete resource" },
      { status: 500 }
    );
  }
}
