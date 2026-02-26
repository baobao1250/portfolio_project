import React from 'react';
import Link from 'next/link';

const UnauthorizedPage: React.FC = () => {

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <main className="text-center ">
        <h1 className="mb-4 text-9xl font-bold text-primary">403</h1>
        <h2 className="mb-4 text-3xl font-semibold text-gray-800">
          Oops! Access Denied
        </h2>
        <p className="mb-8 text-lg text-gray-600">
          Sorry, you are not authorized to access this page.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href="/"
            className="rounded-lg bg-primary px-8 py-3 font-medium text-white hover:bg-opacity-90"
          >
            Back to Home
          </Link>
        </div>
      </main>
    </div>
  );
};

export default UnauthorizedPage; 