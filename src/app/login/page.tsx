'use client';

import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState('student');

  useEffect(() => {
    const u = localStorage.getItem('user');
    if (u) router.push('/');
  }, [router]);

  const handleLogin = () => {
    const mockUser = {
      id: role === 'student' ? 1 : 2,
      name,
      email,
      role,
    };
    localStorage.setItem('user', JSON.stringify(mockUser));
    router.push('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 to-blue-200">
      <div className="bg-white/30 backdrop-blur-md p-8 rounded-xl shadow-xl w-full max-w-md border border-indigo-200">
        <h1 className="text-3xl font-bold text-center text-indigo-700 mb-6">🔐 Login to Nexus Horizon</h1>

        <input
          type="text"
          placeholder="Your Name"
          className="w-full mb-4 p-3 rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="Your Email"
          className="w-full mb-4 p-3 rounded-md border border-indigo-300 focus:ring-2 focus:ring-indigo-400 outline-none"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <select
          className="w-full mb-6 p-3 rounded-md border border-indigo-300 bg-white focus:ring-2 focus:ring-indigo-400 outline-none"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        >
          <option value="student">🎓 Student</option>
          <option value="professor">🧑‍🏫 Professor</option>
        </select>

        <button
          onClick={handleLogin}
          className="w-full py-3 text-white font-semibold bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-lg transition duration-200"
        >
          🚀 Login
        </button>
      </div>
    </div>
  );
}
