import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  // Delete existing data
  await prisma.enrollment.deleteMany();
  await prisma.course.deleteMany();
  await prisma.user.deleteMany();

  // Seed users
  await prisma.user.createMany({
    data: [
      { id: 1, name: 'Student One', email: 'student@example.com' },
      { id: 2, name: 'Professor One', email: 'professor@example.com' },
    ],
  });

  // Seed courses
  await prisma.course.createMany({
    data: [
      { title: 'JavaScript Basics', description: 'Learn the fundamentals of JavaScript.', level: 'beginner' },
      { title: 'React for Beginners', description: 'A hands-on intro to React and Hooks.', level: 'intermediate' },
      { title: 'Database Systems', description: 'Understand relational databases and queries.', level: 'advanced' },
    ],
  });

  console.log('✅ Database reset and seed data inserted!');
}

main()
  .catch((e) => console.error(e))
  .finally(() => prisma.$disconnect());
