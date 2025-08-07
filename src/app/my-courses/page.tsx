'use client';

import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/BackButton';

interface Course {
  id: number;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
}

interface Enrollment {
  id: number;
  course: Course;
}

interface User {
  id: number;
  [key: string]: any;
}

const GET_USER_ENROLLMENTS = gql`
  query ($userId: Int!) {
    getUserEnrollments(userId: $userId) {
      id
      course {
        id
        title
        description
        level
      }
    }
  }
`;

export default function MyCoursesPage() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (!u) {
      router.push('/login');
    } else {
      try {
        setUser(JSON.parse(u));
      } catch {
        router.push('/login');
      }
    }
  }, [router]);

  const { data, loading, error } = useQuery<{ getUserEnrollments: Enrollment[] }>(GET_USER_ENROLLMENTS, {
    variables: { userId: user?.id ?? 0 },
    skip: !user?.id,
  });

  if (!user) return null;
  if (loading) return <p className="text-blue-500 text-center mt-10">Loading your courses...</p>;
  if (error) return <p className="text-red-500 text-center mt-10">Error: {error.message}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-6">
      <div className="max-w-6xl mx-auto">
        <BackButton />
        <h1 className="text-3xl font-bold mb-6 text-indigo-700 text-center">📚 My Enrolled Courses</h1>

        {data?.getUserEnrollments.length === 0 ? (
          <p className="text-center text-gray-600 mt-10">You haven't enrolled in any courses yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...data.getUserEnrollments]
              .sort((a, b) => a.course.title.localeCompare(b.course.title))
              .map((enrollment) => (
                <Link
                  key={enrollment.id}
                  href={`/course/${enrollment.course.id}`}
                  className="block p-5 border border-gray-200 rounded-lg shadow-md hover:shadow-xl hover:bg-white transition duration-200 cursor-pointer bg-white"
                >
                  <h2 className="text-xl font-semibold text-indigo-800">{enrollment.course.title}</h2>
                  <p className="text-gray-700 mt-2">{enrollment.course.description}</p>
                  <span
                    className={`inline-block mt-3 px-3 py-1 rounded-full text-sm font-medium
                      ${enrollment.course.level === 'beginner'
                        ? 'bg-green-100 text-green-700'
                        : enrollment.course.level === 'intermediate'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-700'}`}
                  >
                    {enrollment.course.level.charAt(0).toUpperCase() + enrollment.course.level.slice(1)}
                  </span>
                </Link>
              ))}
          </div>
        )}
      </div>
    </div>
  );
}
