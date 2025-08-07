'use client';

import { gql, useQuery, useMutation } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';

// Define a User type — add more fields if needed
interface User {
  id: number;
  role: string;
  [key: string]: any;
}

const GET_COURSE_BY_ID = gql`
  query ($id: Int!) {
    getCourseById(id: $id) {
      id
      title
      description
      level
    }
  }
`;

const ENROLL_USER = gql`
  mutation ($userId: Int!, $courseId: Int!, $role: String!) {
    enrollUser(userId: $userId, courseId: $courseId, role: $role) {
      id
      role
    }
  }
`;

export default function CourseDetailPage() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.id);

  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser) as User);
      } catch {
        router.push('/login');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const { data, loading, error } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: courseId },
    skip: !courseId,
  });

  const [enrollUser] = useMutation(ENROLL_USER);

  const handleEnroll = async () => {
    if (!user) return;

    try {
      await enrollUser({
        variables: {
          userId: user.id,
          courseId: courseId,
          role: user.role || 'student',
        },
      });
      router.push('/enrolled');
    } catch (err: unknown) {
      // Use more generic error handling
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert('Enrollment failed: ' + message);
    }
  };

  if (loading) return <p className="text-blue-500">Loading...</p>;
  if (error) return <p className="text-red-500">Error: {error.message}</p>;

  if (!data?.getCourseById) return <p>Course not found.</p>;

  const course = data.getCourseById;
  const isProfessor = user?.role === 'professor';
  const isStudent = user?.role === 'student';

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-6">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 border border-blue-200">
        <BackButton />

        <h1 className="text-3xl font-bold text-indigo-700 mb-2">{course.title}</h1>
        <p className="text-gray-700 mb-4">{course.description}</p>
        <div className="mb-6">
          <span className="text-sm font-medium text-gray-500">Level:</span>{' '}
          <span className="text-sm font-semibold text-indigo-800 bg-indigo-100 px-2 py-1 rounded-full ml-1">
            {course.level}
          </span>
        </div>

        <div className="flex space-x-4">
          {isStudent && (
            <button
              onClick={handleEnroll}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg shadow transition"
            >
              🎓 Enroll Now
            </button>
          )}

          {isProfessor && (
            <button
              onClick={() => router.push(`/course/${courseId}/edit`)}
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-lg shadow transition"
            >
              ✏️ Edit Course
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
