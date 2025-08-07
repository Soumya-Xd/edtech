import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    getAllCourses: async () => {
      return await prisma.course.findMany({
        include: { enrollments: true },
      });
    },

    getCourseById: async (_: any, args: { id: number }) => {
      return await prisma.course.findUnique({
        where: { id: args.id },
        include: { enrollments: true },
      });
    },

    getUserEnrollments: async (_: any, args: { userId: number }) => {
      return await prisma.enrollment.findMany({
        where: { userId: args.userId },
        include: { course: true },
      });
    },
  },

  Mutation: {
    enrollUser: async (
      _: any,
      args: { userId: number; courseId: number; role: string }
    ) => {
      return await prisma.enrollment.create({
        data: {
          userId: args.userId,
          courseId: args.courseId,
          role: args.role,
        },
        include: {
          user: true,
          course: true,
        },
      });
    },

    updateCourse: async (
      _: any,
      args: { id: number; title: string; description: string; level: string }
    ) => {
      return await prisma.course.update({
        where: { id: args.id },
        data: {
          title: args.title,
          description: args.description,
          level: args.level,
        },
      });
    },

    deleteCourse: async (_: any, args: { id: number }) => {
      return await prisma.course.delete({
        where: { id: args.id },
      });
    },
  },

  Course: {
    enrollments: (parent: any) =>
      prisma.enrollment.findMany({ where: { courseId: parent.id } }),
  },

  User: {
    enrollments: (parent: any) =>
      prisma.enrollment.findMany({ where: { userId: parent.id } }),
  },

  Enrollment: {
    user: (parent: any) =>
      prisma.user.findUnique({ where: { id: parent.userId } }),
    course: (parent: any) =>
      prisma.course.findUnique({ where: { id: parent.courseId } }),
  },
};
