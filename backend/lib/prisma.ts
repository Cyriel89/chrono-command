import { PrismaClient } from '@prisma/client';

// Ajout de prisma à l'objet global pour éviter les connexions multiples en dev
const globalForPrisma = global as unknown as { prisma: PrismaClient };

export const prisma = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;