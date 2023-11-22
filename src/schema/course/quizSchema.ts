import { z } from "zod";
const OptionSchema = z
  .string()
  .nonempty({ message: "Option cannot be empty" })
  // .min(5, { message: "option must be at least 5 characters long" })
  .max(1000, {
    message: "option cannot be greater than 1000 characters long",
  });

const QuestionSchema = z.object({
  question: z
    .string()
    .nonempty({ message: "Question cannot be empty" })
    .min(10, { message: "question must be at least 10 characters long" })
    .max(1000, {
      message: "question cannot be greater than 1000 characters long",
    }),
  options: z.array(OptionSchema),
  correctAnswer: z
    .string()
    .nonempty({ message: "Correct answer cannot be empty" }),
  point: z.string().min(1, { message: "Points must be a positive number" }),
});

const QuizFormSchema = z.object({
  title: z
    .string()
    .nonempty({ message: "Title cannot be empty" })
    .min(10, { message: "title must be at least 10 characters long" })
    .max(1000, {
      message: "title cannot be greater than 1000 characters long",
    }),
  courseSection: z.string().nonempty({ message: "Section ID is required" }),
  questions: z.array(QuestionSchema),
});

export default QuizFormSchema;
