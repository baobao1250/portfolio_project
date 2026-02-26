import React from 'react';
import Link from 'next/link';

const Error404: React.FC = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <main className="text-center">
        <h1 className="mb-4 text-9xl font-bold text-primary">404</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">
          Oops! Page not found
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          The page you are looking for might have been removed or is temporarily unavailable.
        </p>
        <Link
          href="/"
          className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90"
        >
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default Error404;
