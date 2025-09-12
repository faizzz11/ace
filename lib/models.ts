import mongoose, { Schema, models, model } from "mongoose";

const StudentSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    address: { type: String, required: true },
    studentId: { type: String, required: true },
    course: { type: String, required: true },
    branch: { type: String, required: true },
    year: { type: String, required: true },
    semester: { type: String, required: true },
    rollNumber: { type: String, required: true },
    section: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    emergencyContactRelation: { type: String, required: true },
    parentGuardianName: { type: String, required: true },
    parentGuardianPhone: { type: String, required: true },
    bio: { type: String },
    interests: [{ type: String }],
    skills: [{ type: String }],
    avatarInitials: { type: String },
  },
  { timestamps: true }
);

const TeacherSchema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    gender: { type: String, required: true },
    dateOfBirth: { type: String, required: true },
    address: { type: String, required: true },
    employeeId: { type: String, required: true },
    department: { type: String, required: true },
    designation: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: String, required: true },
    subjects: [{ type: String, required: true }],
    joiningDate: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    emergencyContactRelation: { type: String, required: true },
    bio: { type: String },
    specializations: [{ type: String }],
    avatarInitials: { type: String },
  },
  { timestamps: true }
);

const CanteenSchema = new Schema(
  {
    businessName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    address: { type: String, required: true },
    gstNumber: { type: String },
    licenseNumber: { type: String, required: true },
    cuisineTypes: [{ type: String, required: true }],
    operatingHours: {
      openTime: { type: String, required: true },
      closeTime: { type: String, required: true },
    },
    seatingCapacity: { type: String, required: true },
    servingCapacity: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactPhone: { type: String, required: true },
    bankAccountNumber: { type: String, required: true },
    bankIFSC: { type: String, required: true },
    panNumber: { type: String, required: true },
    description: { type: String },
    specialities: [{ type: String }],
    avatarInitials: { type: String },
  },
  { timestamps: true }
);

const TimetableSchema = new Schema(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    day: { type: String, required: true },
    timeSlot: { type: String, required: true },
    subjectName: { type: String, required: true },
    className: { type: String, required: true },
  },
  { timestamps: true }
);

// Create compound index for unique constraint on teacherId + day + timeSlot
TimetableSchema.index({ teacherId: 1, day: 1, timeSlot: 1 }, { unique: true });

export const StudentModel = models.Student || model("Student", StudentSchema);
export const TeacherModel = models.Teacher || model("Teacher", TeacherSchema);
export const CanteenModel = models.Canteen || model("Canteen", CanteenSchema);
export const TimetableModel = models.Timetable || model("Timetable", TimetableSchema);
