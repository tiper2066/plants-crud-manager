// import { PrismaClient } from '@prisma/client'; // PrismaClient 객체 가져옴
import { PrismaClient } from '@/generated/prisma'; // PrismaClient 객체 가져옴

const globalForPrisma = global as unknown as { prisma: PrismaClient }; // PrismaClient 를 전역객체로 설정
export const prisma = globalForPrisma.prisma || new PrismaClient(); // 전역객체를 prisma 변수에 할당

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma; // 개발 모드에서는 전역객체 사용
