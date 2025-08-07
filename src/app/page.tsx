'use client';

import { gql, useQuery } from '@apollo/client';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface Course {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface GetAllCoursesData {
  getAllCourses: Course[];
}

const GET_ALL_COURSES = gql`
  query {
    getAllCourses {
      id
      title
      description
      level
    }
  }
`;

export default function HomePage() {
  const { data, loading, error } = useQuery<GetAllCoursesData>(GET_ALL_COURSES);

  if (loading) return <p className="text-blue-500 p-6">Loading...</p>;
  if (error) return <p className="text-red-500 p-6">Error: {error.message}</p>;

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow p-6">
        <h1 className="text-3xl font-bold mb-6 text-center text-indigo-700">📚 Available Courses</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.getAllCourses.map((course) => (
            <Link
              key={course.id}
              href={`/course/${course.id}`}
              className="block p-5 border rounded-lg shadow-md hover:shadow-xl hover:bg-blue-50 transition cursor-pointer"
            >
              <h2 className="text-xl font-semibold text-indigo-800">{course.title}</h2>
              <p className="text-gray-700 mt-2">{course.description}</p>
              <span className="inline-block mt-3 px-3 py-1 bg-indigo-100 text-indigo-800 text-sm rounded-full">
                Level: {course.level.charAt(0).toUpperCase() + course.level.slice(1)}
              </span>
            </Link>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
