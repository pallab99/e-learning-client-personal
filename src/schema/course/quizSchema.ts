import { z } from 'zod';
const OptionSchema = z.string();

const QuestionSchema = z.object({
  question: z.string().nonempty({ message: 'Question cannot be empty' }),
  options: z.array(OptionSchema),
  correctAnswer: z
    .string()
    .nonempty({ message: 'Correct answer cannot be empty' }),
  point: z.string().min(1, { message: 'Points must be a positive number' }),
});

const QuizFormSchema = z.object({
  sectionId: z.string().nonempty({ message: 'Section ID is required' }),
  questions: z.array(QuestionSchema),
});

export default QuizFormSchema;
