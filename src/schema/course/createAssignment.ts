import { z } from 'zod';

const createAssignmentSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  instructions: z.string().nonempty({ message: 'Instructions are required' }),
  point: z.string().min(1, { message: 'Points must be a positive number' }),
  sectionId: z.string().nonempty({ message: 'Section ID is required' }),
  content: z.any()?.optional(),
});
export default createAssignmentSchema;
