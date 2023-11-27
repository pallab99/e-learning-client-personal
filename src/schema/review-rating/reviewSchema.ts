import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().positive({ message: "Rating is required" }),
  reviewMessage: z
    .string()
    .min(10, {
      message: "Review message can not be less than 10 characters",
    })
    .max(200, {
      message: "Review message can not be greater than 200 characters",
    })
    .regex(/^[a-zA-Z0-9? .\n]*$/, {
      message:
        "Review message can only contain alphabets, numbers, ?, . and spaces",
    })
    .optional()
    .or(z.literal("")),
});

export default reviewSchema;
