'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';
import Link from 'next/link';

export default function EnrolledPage() {
  useEffect(() => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-green-100 to-emerald-200 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 max-w-md text-center border border-green-300">
        <div className="text-5xl mb-4">✅</div>
        <h1 className="text-3xl font-bold text-green-700 mb-2">Enrollment Successful!</h1>
        <p className="text-gray-700 text-lg">You're now enrolled in the course. 🎉</p>

        <Link
          href="/"
          className="inline-block mt-6 px-5 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 transition shadow"
        >
          Go to Home
        </Link>
      </div>
    </div>
  );
}
