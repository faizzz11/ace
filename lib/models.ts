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
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    phone: { type: String, required: true },
    alternatePhone: { type: String },
    gstNumber: { type: String },
    cuisineTypes: [{ type: String, required: true }],
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

const AttendanceSchema = new Schema(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    className: { type: String, required: true },
    subjectName: { type: String, required: true },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    status: { type: String, enum: ['present', 'absent', 'late'], default: 'absent' },
    timeSlot: { type: String }, // Optional: specific time slot
    remarks: { type: String }, // Optional: teacher notes
  },
  { timestamps: true }
);

// Compound index for unique attendance record per student per class per date
AttendanceSchema.index({ studentId: 1, teacherId: 1, className: 1, date: 1, subjectName: 1 }, { unique: true });

const SectionSchema = new Schema(
  {
    teacherId: { type: Schema.Types.ObjectId, ref: 'Teacher', required: true },
    className: { type: String, required: true },
    subjectName: { type: String, required: true },
    students: [{ type: Schema.Types.ObjectId, ref: 'Student' }],
    academicYear: { type: String, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for efficient querying
SectionSchema.index({ teacherId: 1, className: 1, subjectName: 1 });
SectionSchema.index({ className: 1 });

const MenuItemSchema = new Schema(
  {
    canteenId: { type: Schema.Types.ObjectId, ref: 'Canteen', required: true },
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    image: { type: String }, // Base64 encoded image or URL
    isVeg: { type: Boolean, default: true },
    isSpicy: { type: Boolean, default: false },
    prepTime: { type: Number, default: 15 }, // in minutes
    rating: { type: Number, default: 4.0, min: 0, max: 5 },
    isAvailable: { type: Boolean, default: true },
  },
  { timestamps: true }
);

// Index for efficient querying
MenuItemSchema.index({ canteenId: 1 });
MenuItemSchema.index({ canteenId: 1, category: 1 });
MenuItemSchema.index({ canteenId: 1, isAvailable: 1 });

export const StudentModel = models.Student || model("Student", StudentSchema);
export const TeacherModel = models.Teacher || model("Teacher", TeacherSchema);

// Force recreate the Canteen model to ensure schema changes are applied
try {
  mongoose.deleteModel("Canteen");
} catch (e) {
  // Model doesn't exist yet, that's fine
}
export const CanteenModel = model("Canteen", CanteenSchema);

export const TimetableModel = models.Timetable || model("Timetable", TimetableSchema);
export const AttendanceModel = models.Attendance || model("Attendance", AttendanceSchema);
export const SectionModel = models.Section || model("Section", SectionSchema);
export const MenuItemModel = models.MenuItem || model("MenuItem", MenuItemSchema);
