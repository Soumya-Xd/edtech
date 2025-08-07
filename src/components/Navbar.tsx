'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
  const { user, setUser } = useAuth();
  const router = useRouter();

  const logout = () => {
    localStorage.removeItem('user');
    setUser(null);
    router.push('/login');
  };

  return (
    <nav className="flex flex-col sm:flex-row justify-between items-center p-4 bg-indigo-700 text-white shadow-md">
      <div className="flex items-center space-x-3">
        <Link href="/" className="text-2xl font-bold tracking-wide hover:text-indigo-300 transition">
          🚀 EdTech
        </Link>
      </div>

      <div className="flex items-center mt-3 sm:mt-0 space-x-4">
        {user ? (
          <>
            <span className="text-sm">
              👋 Hello, <strong>{user.name}</strong> ({user.role})
            </span>
            <button
              onClick={logout}
              className="bg-white text-indigo-700 font-medium px-4 py-1 rounded hover:bg-indigo-100 transition"
            >
              Logout
            </button>
          </>
        ) : (
          <Link
            href="/login"
            className="bg-white text-indigo-700 font-medium px-4 py-1 rounded hover:bg-indigo-100 transition"
          >
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}
