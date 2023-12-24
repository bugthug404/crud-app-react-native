import { z } from "zod";

export const createUserSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  mobile: z.string().min(10),
  profession: z.string(),
  address: z.string(),
  role: z.string(),
  password: z.string().min(4),
});
