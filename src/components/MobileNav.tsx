'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function MobileNav() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  // 페이지 변경 시 메뉴 자동 닫기
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // 스크롤 방지 (메뉴 열릴 때)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const menuItems = [
    { href: '/', label: '홈', icon: '🏠' },
    { href: '/updates', label: '업데이트 내역', icon: '📋' },
    { href: '/contact', label: '문의', icon: '💬' },
  ];

  return (
    <div className="md:hidden">
      {/* 햄버거 메뉴 버튼 - 개선된 디자인 */}
      <button
        onClick={toggleMenu}
        className="relative p-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
        aria-label={isOpen ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={isOpen}
      >
        <div className="w-6 h-6 relative">
          <span
            className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isOpen ? 'rotate-45 top-3' : 'top-1'
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 top-3 ${
              isOpen ? 'opacity-0' : 'opacity-100'
            }`}
          />
          <span
            className={`absolute block w-6 h-0.5 bg-current transform transition-all duration-300 ${
              isOpen ? '-rotate-45 top-3' : 'top-5'
            }`}
          />
        </div>
      </button>

      {/* 모바일 메뉴 오버레이 - 개선된 애니메이션 */}
      <div
        className={`fixed inset-0 z-50 transition-all duration-300 ${
          isOpen ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        {/* 배경 오버레이 */}
        <div
          className={`absolute inset-0 bg-black transition-opacity duration-300 ${
            isOpen ? 'opacity-50' : 'opacity-0'
          }`}
          onClick={closeMenu}
        />
        
        {/* 메뉴 패널 */}
        <div
          className={`absolute top-16 right-0 left-0 bg-white shadow-2xl transform transition-all duration-300 ${
            isOpen ? 'translate-y-0 opacity-100' : '-translate-y-4 opacity-0'
          }`}
        >
          <div className="px-4 py-6 max-h-[calc(100vh-4rem)] overflow-y-auto">
            {/* 메뉴 아이템들 */}
            <div className="space-y-2">
              {menuItems.map((item, index) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center px-4 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 ${
                    pathname === item.href ? 'bg-blue-50 text-blue-600 font-semibold' : ''
                  }`}
                  onClick={closeMenu}
                  style={{
                    animationDelay: isOpen ? `${index * 50}ms` : '0ms'
                  }}
                >
                  <span className="text-lg mr-3">{item.icon}</span>
                  <span className="text-base">{item.label}</span>
                  {pathname === item.href && (
                    <span className="ml-auto w-2 h-2 bg-blue-600 rounded-full"></span>
                  )}
                </Link>
              ))}
              
              {/* 구분선 */}
              <div className="my-4 border-t border-gray-200"></div>
              
              {/* 무료샘플신청 버튼 - 강조된 디자인 */}
              <Link
                href="/sample"
                className="flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 text-white px-4 py-4 rounded-lg hover:from-green-700 hover:to-green-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 mb-3"
                onClick={closeMenu}
              >
                <span className="text-lg mr-2">📄</span>
                <span className="text-base">무료샘플신청</span>
              </Link>
              
              {/* 구매하기 버튼 - 강조된 디자인 */}
              <Link
                href="/order"
                className="flex items-center justify-center bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 py-4 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105"
                onClick={closeMenu}
              >
                <span className="text-lg mr-2">💳</span>
                <span className="text-base">구매하기</span>
              </Link>
            </div>
            
            {/* 추가 정보 섹션 */}
            <div className="mt-6 pt-4 border-t border-gray-200">
              <div className="text-center">
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 