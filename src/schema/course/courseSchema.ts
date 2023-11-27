import { z } from "zod";

const CourseSchema = z.object({
  title: z
    .string()
    .nonempty("Title is required")
    .min(10, { message: "Title must be atleast 10 characters long" })
    .max(200, {
      message: "Title cannot be greater than 100 characters long",
    }),
  sub_title: z
    .string()
    .nonempty("Sub Title is required")
    .min(30, { message: "Sub Title must be atleast 30 characters long" })
    .max(200, {
      message: "Sub Title cannot be greater than 200 characters long",
    }),
  prerequisites: z
    .array(
      z
        .string()
        .min(20, "Prerequisite must be at least 20 characters long")
        .max(500, "Prerequisite cannot be greater than 500 characters long")
        .nonempty("Prerequisite are required")
    )
    .nonempty("Prerequisites are required")
    .refine((prerequisites) => prerequisites.every(Boolean), {
      message: "All prerequisites must be filled",
    }),
  benefits: z
    .array(
      z
        .string()
        .min(20, "Benefit must be at least 20 characters long")
        .max(500, "Benefit cannot be greater than 500 characters long")
        .nonempty("Benefits are required")
    )
    .nonempty("Benefits are required")
    .refine((benefits) => benefits.every(Boolean), {
      message: "All benefits must be filled",
    }),
  level: z.string().nonempty("Level is required"),
  category: z.string().nonempty("Category is required"),
  description: z.string().nonempty("Description is required"),
});

export default CourseSchema;
