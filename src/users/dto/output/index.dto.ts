import type { User } from '@prisma/client';

export interface UserOutput extends User {
  defaultCategoryId: string;
}
