'use client';

import './globals.css';
import { ReactNode } from 'react';
import { ApolloProvider } from '@apollo/client';
import client from '@/lib/apolloClient';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/context/AuthContext'; // ✅ import your AuthProvider

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>
          <AuthProvider> {/* ✅ Wrap here */}
            <Navbar />
            {children}
          </AuthProvider>
        </ApolloProvider>
      </body>
    </html>
  );
}
