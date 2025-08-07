'use client';

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-10">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Promotion / Contact */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-400">Contact & Promotion</h3>
          <p>Have a project or want to collaborate?</p>
          <p>Email: <a href="mailto:soumyasingharoy06@gmail.com" className="text-blue-300 hover:underline">soumyasingharoy06@gmail.com</a></p>
        </div>

        {/* Important Links */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-400">Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="https://www.soumyaroy.site" target="_blank" className="hover:text-blue-300">
                🌐 My Portfolio
              </Link>
            </li>
            <li>
              <Link href="https://github.com/Soumya-Xd/edtech" target="_blank" className="hover:text-blue-300">
                💻 GitHub
              </Link>
            </li>
          </ul>
        </div>

        {/* Branding / Credits */}
        <div>
          <h3 className="text-lg font-bold mb-2 text-blue-400">Powered By</h3>
          <p className="text-sm">Nexus Horizon © {new Date().getFullYear()}</p>
          <p className="text-sm">All rights reserved.</p>
        </div>
      </div>

      <div className="bg-gray-800 text-center text-sm py-3 border-t border-gray-700">
        &copy; {new Date().getFullYear()} <span className="text-blue-300">Nexus Horizon</span>. Built with ❤️ by Soumya.
      </div>
    </footer>
  );
}
