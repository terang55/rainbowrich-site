'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      {/* 햄버거 메뉴 버튼 */}
      <button
        onClick={toggleMenu}
        className="p-2 rounded-md text-gray-600 hover:text-blue-600 hover:bg-gray-100 transition-colors"
        aria-label="메뉴 열기"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          {isOpen ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          )}
        </svg>
      </button>

      {/* 모바일 메뉴 오버레이 */}
      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeMenu}
          />
          <div className="fixed top-16 right-0 left-0 bg-white shadow-lg z-50 border-t">
            <div className="px-4 py-2 space-y-1">
              <Link
                href="/"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                🏠 홈
              </Link>
              <Link
                href="/updates"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                📋 업데이트 내역
              </Link>
              <Link
                href="/contact"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                📞 문의
              </Link>
              <Link
                href="/sample"
                className="block px-3 py-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-md transition-colors"
                onClick={closeMenu}
              >
                📄 무료샘플신청
              </Link>
              <div className="pt-2 border-t">
                <Link
                  href="/order"
                  className="block bg-blue-600 text-white px-3 py-3 rounded-md hover:bg-blue-700 transition-colors font-semibold text-center"
                  onClick={closeMenu}
                >
                  💳 구매하기
                </Link>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
} 