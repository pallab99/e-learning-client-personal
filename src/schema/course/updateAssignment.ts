import { z } from 'zod';

const updateAssignmentSchema = z.object({
  title: z.string().nonempty({ message: 'Title is required' }),
  description: z.string().min(1, { message: 'Description is required' }),
  instructions: z.string().nonempty({ message: 'Instructions are required' }),
  point: z.string().min(1, { message: 'Points must be a positive number' }),
  content: z.any()?.optional(),
});
export default updateAssignmentSchema;
