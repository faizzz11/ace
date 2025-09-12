import mongoose, { Schema, models, model } from "mongoose";

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

const StockItemSchema = new Schema(
  {
    canteenId: { type: Schema.Types.ObjectId, ref: 'Canteen', required: true },
    name: { type: String, required: true },
    category: { type: String, required: true },
    currentStock: { type: Number, required: true, min: 0 },
    unit: { type: String, required: true }, // kg, liters, pieces, etc.
    minimumStock: { type: Number, required: true, min: 0 },
    maximumStock: { type: Number, required: true, min: 0 },
    costPerUnit: { type: Number, required: true, min: 0 },
    supplier: { type: String },
    lastRestocked: { type: Date },
    expiryDate: { type: Date },
    status: { 
      type: String, 
      enum: ['good', 'low', 'critical', 'out_of_stock'], 
      default: 'good' 
    },
    description: { type: String },
    location: { type: String }, // Storage location
    batchNumber: { type: String },
  },
  { timestamps: true }
);

// Index for efficient querying
StockItemSchema.index({ canteenId: 1 });
StockItemSchema.index({ canteenId: 1, category: 1 });
StockItemSchema.index({ canteenId: 1, status: 1 });
StockItemSchema.index({ canteenId: 1, currentStock: 1 });

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

const EventSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    eventType: { type: String, enum: ['academic', 'cultural', 'sports', 'workshop', 'seminar', 'other'], required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    venue: { type: String, required: true },
    organizer: { type: String, required: true },
    contactEmail: { type: String },
    contactPhone: { type: String },
    maxParticipants: { type: Number },
    registrationDeadline: { type: Date },
    fee: { type: Number, default: 0 },
    status: { type: String, enum: ['draft', 'published', 'ongoing', 'completed', 'cancelled'], default: 'draft' },
    imageUrl: { type: String },
    tags: [{ type: String }],
    requirements: [{ type: String }],
    isPublic: { type: Boolean, default: true },
  },
  { timestamps: true }
);

const ResourceSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
    category: { type: String, enum: ['book', 'equipment', 'facility'], required: true },
    
    // Common fields
    location: { type: String, required: true },
    isAvailable: { type: Boolean, default: true },
    condition: { type: String, enum: ['excellent', 'good', 'fair', 'damaged'], default: 'good' },
    status: { type: String, enum: ['active', 'maintenance', 'retired'], default: 'active' },
    tags: [{ type: String }],
    image: { type: String },
    
    // For Books
    isbn: { type: String },
    author: { type: String },
    publisher: { type: String },
    edition: { type: String },
    totalCopies: { type: Number },
    availableCopies: { type: Number },
    
    // For Equipment
    serialNumber: { type: String },
    model: { type: String },
    brand: { type: String },
    specifications: { type: String },
    
    // For Facilities (Seminar Halls)
    capacity: { type: Number },
    amenities: [{ type: String }],
    operatingHours: {
      start: { type: String },
      end: { type: String }
    },
    
    // Booking/Borrowing info
    maxBorrowDuration: { type: Number }, // in days for books/equipment, hours for facilities
    requiresApproval: { type: Boolean, default: false },
    currentBorrower: { type: String },
    dueDate: { type: Date },
    totalBorrows: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const BookingSchema = new Schema(
  {
    resourceId: { type: Schema.Types.ObjectId, ref: 'Resource', required: true },
    userId: { type: Schema.Types.ObjectId, required: true }, // Can be student or teacher
    userType: { type: String, enum: ['student', 'teacher'], required: true },
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    userPhone: { type: String },
    purpose: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    startTime: { type: String }, // For hourly bookings
    endTime: { type: String }, // For hourly bookings
    status: { type: String, enum: ['pending', 'approved', 'rejected', 'active', 'completed', 'cancelled'], default: 'pending' },
    approvedBy: { type: String },
    approvedAt: { type: Date },
    rejectedReason: { type: String },
    totalFee: { type: Number, default: 0 },
    isPaid: { type: Boolean, default: false },
    notes: { type: String },
    returnCondition: { type: String, enum: ['excellent', 'good', 'fair', 'damaged'] },
    returnNotes: { type: String },
    returnedAt: { type: Date },
  },
  { timestamps: true }
);

const InternshipSchema = new Schema(
  {
    title: { type: String, required: true },
    company: { type: String, required: true },
    description: { type: String, required: true },
    requirements: [{ type: String }],
    responsibilities: [{ type: String }],
    skills: [{ type: String }],
    location: { type: String, required: true },
    locationType: { type: String, enum: ['onsite', 'remote', 'hybrid'], required: true },
    duration: { type: String, required: true },
    stipend: { type: String },
    applicationDeadline: { type: Date, required: true },
    startDate: { type: Date },
    endDate: { type: Date },
    contactEmail: { type: String, required: true },
    contactPhone: { type: String },
    companyWebsite: { type: String },
    applicationUrl: { type: String },
    status: { type: String, enum: ['active', 'closed', 'draft'], default: 'draft' },
    category: { type: String, enum: ['engineering', 'design', 'marketing', 'sales', 'hr', 'finance', 'other'] },
    experienceLevel: { type: String, enum: ['fresher', 'experienced'], default: 'fresher' },
    isRemote: { type: Boolean, default: false },
    applicationCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const InternshipApplicationSchema = new Schema(
  {
    internshipId: { type: Schema.Types.ObjectId, ref: 'Internship', required: true },
    studentId: { type: Schema.Types.ObjectId, ref: 'Student', required: true },
    studentName: { type: String, required: true },
    studentEmail: { type: String, required: true },
    studentPhone: { type: String, required: true },
    studentClass: { type: String, required: true }, // year + branch + section
    studentRollNumber: { type: String, required: true },
    resumeFileName: { type: String, required: true },
    resumeFilePath: { type: String, required: true }, // Base64 or file path
    resumeFileType: { type: String, required: true }, // pdf, doc, docx
    coverLetter: { type: String }, // Optional cover letter
    applicationStatus: { 
      type: String, 
      enum: ['pending', 'under_review', 'shortlisted', 'rejected', 'selected'], 
      default: 'pending' 
    },
    appliedAt: { type: Date, default: Date.now },
    reviewedAt: { type: Date },
    reviewedBy: { type: String },
    reviewNotes: { type: String },
    interviewDate: { type: Date },
    interviewTime: { type: String },
    interviewVenue: { type: String },
    selectionNotes: { type: String },
  },
  { timestamps: true }
);

// Indexes for better performance
EventSchema.index({ startDate: 1, status: 1 });
EventSchema.index({ eventType: 1 });
ResourceSchema.index({ category: 1, location: 1 });
ResourceSchema.index({ status: 1, isAvailable: 1 });
ResourceSchema.index({ name: 'text', description: 'text', location: 'text' });
ResourceSchema.index({ category: 1, status: 1 });
BookingSchema.index({ resourceId: 1, startDate: 1, endDate: 1 });
BookingSchema.index({ userId: 1, status: 1 });
InternshipSchema.index({ applicationDeadline: 1, status: 1 });
InternshipSchema.index({ company: 1, category: 1 });
InternshipApplicationSchema.index({ internshipId: 1, studentId: 1 }, { unique: true }); // Prevent duplicate applications
InternshipApplicationSchema.index({ studentId: 1, applicationStatus: 1 });
InternshipApplicationSchema.index({ internshipId: 1, applicationStatus: 1 });

export const StudentModel = models.Student || model("Student", StudentSchema);
export const TeacherModel = models.Teacher || model("Teacher", TeacherSchema);
export const CanteenModel = models.Canteen || model("Canteen", CanteenSchema);
export const TimetableModel = models.Timetable || model("Timetable", TimetableSchema);
export const AttendanceModel = models.Attendance || model("Attendance", AttendanceSchema);
export const SectionModel = models.Section || model("Section", SectionSchema);
export const MenuItemModel = models.MenuItem || model("MenuItem", MenuItemSchema);
export const StockItemModel = models.StockItem || model("StockItem", StockItemSchema);
export const EventModel = models.Event || model("Event", EventSchema);
export const ResourceModel = models.Resource || model("Resource", ResourceSchema);
export const BookingModel = models.Booking || model("Booking", BookingSchema);
export const InternshipModel = models.Internship || model("Internship", InternshipSchema);
export const InternshipApplicationModel = models.InternshipApplication || model("InternshipApplication", InternshipApplicationSchema);
