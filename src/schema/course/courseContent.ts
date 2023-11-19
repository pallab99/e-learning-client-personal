import { z } from 'zod';

const CourseContentSchema = z.object({
  title: z
    .string()
    .nonempty('Title is required')
    .min(10, { message: 'Title must be atleast 10 characters long' })
    .max(100, {
      message: 'Title cannot be greater than 100 characters long',
    }),
  sectionId: z.string().nonempty('Select the section'),
});

export default CourseContentSchema;
