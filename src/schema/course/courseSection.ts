import { z } from 'zod';

const CourseSectionSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(10, { message: 'Title must be atleast 10 characters long' })
    .max(100, {
      message: 'Title cannot be greater than 100 characters long',
    }),
});

export default CourseSectionSchema;
