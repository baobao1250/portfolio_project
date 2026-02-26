'use client'; // <--- Dòng này quan trọng nhất: Báo hiệu chạy ở Client

import Link from 'next/link';
import { motion } from 'framer-motion';

// Định nghĩa danh sách các tab để loop
const TABS = ['home', 'about', 'contact'];

export default function TabNavigation({ activeTab }: { activeTab: string }) {
  return (
    <div className="flex justify-center items-center gap-4 mb-8">
      {TABS.map((tabKey) => {
        const isActive = activeTab === tabKey;

        return (
          <Link
            key={tabKey}
            href={`/${tabKey}`}
            scroll={false}
            className="relative px-6 py-2.5 rounded-full text-sm font-medium transition-colors duration-300 ease-in-out"
          >
            {/* 1. LAYER NỀN: Animation trượt */}
            {isActive && (
              <motion.span
                layoutId="active-pill"
                className="absolute inset-0 bg-blue-600 rounded-full shadow-md z-0"
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
              />
            )}

            {/* 2. LAYER TEXT */}
            <span className={`relative z-10 ${isActive ? 'text-white' : 'text-gray-500 hover:text-gray-900'}`}>
              {tabKey.charAt(0).toUpperCase() + tabKey.slice(1)}
            </span>
            
            {/* 3. Hover Effect */}
            {!isActive && (
                <motion.span 
                    className="absolute inset-0 bg-gray-100 rounded-full z-[-1]"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.2 }}
                />
            )}
          </Link>
        );
      })}
    </div>
  );
}