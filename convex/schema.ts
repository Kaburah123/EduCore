import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.optional(v.string()),
    email: v.optional(v.string()),
    role: v.optional(v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student"),
      v.literal("parent")
    )),
    avatar: v.optional(v.string()),
    phone: v.optional(v.string()),
  }).index("by_token", ["tokenIdentifier"]).index("by_role", ["role"]),

  classes: defineTable({
    name: v.string(), // e.g. "Grade 10A"
    grade: v.string(), // e.g. "10"
    section: v.string(), // e.g. "A"
    teacherId: v.optional(v.id("users")), // class teacher
    academicYear: v.string(),
    capacity: v.number(),
  }).index("by_grade", ["grade"]).index("by_teacher", ["teacherId"]),

  students: defineTable({
    userId: v.optional(v.id("users")),
    admissionNumber: v.string(),
    name: v.string(),
    dateOfBirth: v.optional(v.string()),
    gender: v.optional(v.union(v.literal("male"), v.literal("female"), v.literal("other"))),
    classId: v.id("classes"),
    parentId: v.optional(v.id("users")),
    address: v.optional(v.string()),
    phone: v.optional(v.string()),
    bloodGroup: v.optional(v.string()),
    photo: v.optional(v.string()),
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("graduated")),
  }).index("by_class", ["classId"]).index("by_parent", ["parentId"]).index("by_admission", ["admissionNumber"]),

  subjects: defineTable({
    name: v.string(),
    code: v.string(),
    classId: v.id("classes"),
    teacherId: v.optional(v.id("users")),
    description: v.optional(v.string()),
  }).index("by_class", ["classId"]).index("by_teacher", ["teacherId"]),

  attendance: defineTable({
    studentId: v.id("students"),
    classId: v.id("classes"),
    date: v.string(), // ISO date string YYYY-MM-DD
    status: v.union(
      v.literal("present"),
      v.literal("absent"),
      v.literal("late"),
      v.literal("excused")
    ),
    markedBy: v.id("users"),
    note: v.optional(v.string()),
  }).index("by_student", ["studentId"]).index("by_class_date", ["classId", "date"]).index("by_date", ["date"]),

  grades: defineTable({
    studentId: v.id("students"),
    subjectId: v.id("subjects"),
    classId: v.id("classes"),
    examType: v.string(), // "midterm", "final", "quiz", "assignment"
    score: v.number(),
    maxScore: v.number(),
    term: v.string(), // "Term 1", "Term 2", "Term 3"
    academicYear: v.string(),
    remarks: v.optional(v.string()),
    gradedBy: v.id("users"),
  }).index("by_student", ["studentId"]).index("by_subject", ["subjectId"]).index("by_class", ["classId"]),

  timetable: defineTable({
    classId: v.id("classes"),
    subjectId: v.id("subjects"),
    teacherId: v.id("users"),
    dayOfWeek: v.number(), // 0=Mon, 4=Fri
    startTime: v.string(), // "08:00"
    endTime: v.string(),   // "09:00"
    room: v.optional(v.string()),
    academicYear: v.string(),
  }).index("by_class", ["classId"]).index("by_teacher", ["teacherId"]),

  assignments: defineTable({
    title: v.string(),
    description: v.string(),
    subjectId: v.id("subjects"),
    classId: v.id("classes"),
    teacherId: v.id("users"),
    dueDate: v.string(), // ISO date string
    maxScore: v.optional(v.number()),
    attachmentUrl: v.optional(v.string()),
  }).index("by_class", ["classId"]).index("by_teacher", ["teacherId"]).index("by_subject", ["subjectId"]),

  submissions: defineTable({
    assignmentId: v.id("assignments"),
    studentId: v.id("students"),
    submittedAt: v.string(),
    content: v.optional(v.string()),
    attachmentUrl: v.optional(v.string()),
    score: v.optional(v.number()),
    feedback: v.optional(v.string()),
    status: v.union(v.literal("submitted"), v.literal("graded"), v.literal("late")),
  }).index("by_assignment", ["assignmentId"]).index("by_student", ["studentId"]),

  announcements: defineTable({
    title: v.string(),
    content: v.string(),
    authorId: v.id("users"),
    targetRoles: v.array(v.union(
      v.literal("admin"),
      v.literal("teacher"),
      v.literal("student"),
      v.literal("parent")
    )),
    classId: v.optional(v.id("classes")), // null = school-wide
    isPinned: v.boolean(),
  }).index("by_author", ["authorId"]),

  messages: defineTable({
    senderId: v.id("users"),
    receiverId: v.id("users"),
    content: v.string(),
    isRead: v.boolean(),
  }).index("by_sender", ["senderId"]).index("by_receiver", ["receiverId"]),

  fees: defineTable({
    studentId: v.id("students"),
    classId: v.id("classes"),
    feeType: v.string(), // "tuition", "activity", "transport", "library"
    amount: v.number(),
    dueDate: v.string(),
    paidAmount: v.number(),
    paidDate: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("partial"), v.literal("paid"), v.literal("overdue")),
    academicYear: v.string(),
    term: v.string(),
  }).index("by_student", ["studentId"]).index("by_class", ["classId"]).index("by_status", ["status"]),

  books: defineTable({
    title: v.string(),
    author: v.string(),
    isbn: v.optional(v.string()),
    category: v.string(),
    totalCopies: v.number(),
    availableCopies: v.number(),
    description: v.optional(v.string()),
    coverUrl: v.optional(v.string()),
  }).index("by_category", ["category"]),

  bookBorrows: defineTable({
    bookId: v.id("books"),
    studentId: v.id("students"),
    borrowedDate: v.string(),
    dueDate: v.string(),
    returnedDate: v.optional(v.string()),
    status: v.union(v.literal("borrowed"), v.literal("returned"), v.literal("overdue")),
  }).index("by_book", ["bookId"]).index("by_student", ["studentId"]).index("by_status", ["status"]),
});