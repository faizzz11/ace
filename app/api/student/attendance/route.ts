import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import { AttendanceModel, ClassroomEnrollmentModel } from "@/lib/models";

export async function GET(request: NextRequest) {
  try {
    await connectToDatabase();

    const { searchParams } = new URL(request.url);
    const studentId = searchParams.get("studentId");
    const classroomId = searchParams.get("classroomId");
    const startDate = searchParams.get("startDate");
    const endDate = searchParams.get("endDate");

    if (!studentId) {
      return NextResponse.json(
        { error: "Student ID is required" },
        { status: 400 }
      );
    }

    // Get student's enrolled classrooms
    const enrollments = await ClassroomEnrollmentModel.find({
      studentId,
      status: "active",
    })
      .populate("classroomId", "title subject teacherName")
      .sort({ enrolledAt: -1 });

    if (!classroomId) {
      return NextResponse.json({
        success: true,
        attendanceRecords: [],
        enrollments,
        message: "Select a classroom to view attendance",
      });
    }

    // Verify student is enrolled in the classroom
    const enrollment = enrollments.find(
      (e) => e.classroomId._id.toString() === classroomId
    );
    if (!enrollment) {
      return NextResponse.json(
        { error: "Student not enrolled in this classroom" },
        { status: 403 }
      );
    }

    // Build query for attendance records
    let query: any = {
      studentId,
      teacherId: enrollment.classroomId.teacherId,
      className: enrollment.classroomId.title,
    };

    // Add date range filter if provided
    if (startDate && endDate) {
      query.date = {
        $gte: startDate,
        $lte: endDate,
      };
    }

    // Get attendance records
    const attendanceRecords = await AttendanceModel.find(query).sort({
      date: -1,
      createdAt: -1,
    });

    // Calculate attendance statistics
    const totalClasses = attendanceRecords.length;
    const presentCount = attendanceRecords.filter(
      (record) => record.status === "present"
    ).length;
    const lateCount = attendanceRecords.filter(
      (record) => record.status === "late"
    ).length;
    const absentCount = attendanceRecords.filter(
      (record) => record.status === "absent"
    ).length;
    const attendancePercentage =
      totalClasses > 0 ? Math.round((presentCount / totalClasses) * 100) : 0;

    return NextResponse.json({
      success: true,
      attendanceRecords,
      enrollments,
      statistics: {
        totalClasses,
        presentCount,
        lateCount,
        absentCount,
        attendancePercentage,
      },
      classroom: enrollment.classroomId,
    });
  } catch (error) {
    console.error("Error fetching student attendance:", error);
    return NextResponse.json(
      { error: "Failed to fetch attendance data" },
      { status: 500 }
    );
  }
}
