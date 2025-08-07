'use client';

import { gql, useMutation, useQuery } from '@apollo/client';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import BackButton from '@/components/BackButton';

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

const UPDATE_COURSE = gql`
  mutation UpdateCourse($id: Int!, $title: String!, $description: String!, $level: String!) {
    updateCourse(id: $id, title: $title, description: $description, level: $level) {
      id
    }
  }
`;

export default function EditCoursePage() {
  const router = useRouter();
  const params = useParams();
  const courseId = Number(params.id);

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [level, setLevel] = useState('beginner');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const u = JSON.parse(storedUser);
      setUser(u);
      if (u.role !== 'professor') {
        router.push('/');
      }
    } else {
      router.push('/login');
    }
  }, [router]);

  const { data } = useQuery(GET_COURSE_BY_ID, {
    variables: { id: courseId },
    skip: !courseId,
  });

  const [updateCourse] = useMutation(UPDATE_COURSE);

  useEffect(() => {
    if (data?.getCourseById) {
      setTitle(data.getCourseById.title);
      setDescription(data.getCourseById.description);
      setLevel(data.getCourseById.level);
    }
  }, [data]);

  const handleUpdate = async () => {
    await updateCourse({
      variables: {
        id: courseId,
        title,
        description,
        level,
      },
    });
    router.push(`/course/${courseId}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white py-10 px-6">
      <div className="max-w-2xl mx-auto bg-white border rounded-xl shadow-lg p-8">
        <BackButton />
        <h1 className="text-3xl font-bold text-indigo-800 mb-6">✏️ Edit Course</h1>

        <div className="space-y-4">
          <input
            type="text"
            placeholder="Course Title"
            className="w-full p-3 border rounded-lg shadow-sm focus:ring-2 focus:ring-indigo-300"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea
            placeholder="Course Description"
            className="w-full p-3 border rounded-lg shadow-sm h-32 resize-none focus:ring-2 focus:ring-indigo-300"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <select
            className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-indigo-300"
            value={level}
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="beginner">🌱 Beginner</option>
            <option value="intermediate">🛠 Intermediate</option>
            <option value="advanced">🚀 Advanced</option>
          </select>

          <button
            onClick={handleUpdate}
            className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg shadow-md transition transform hover:scale-105"
          >
            ✅ Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}
