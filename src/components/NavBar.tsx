'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import MobileNav from './MobileNav';

export default function NavBar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { href: '/', label: '홈' },
    { href: '/updates', label: '업데이트 내역' },
    { href: '/contact', label: '문의' },
    { href: '/sample', label: '무료샘플신청' },
  ];

  return (
    <nav 
      className={`bg-white/95 backdrop-blur-md border-b sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? 'shadow-lg border-gray-200' : 'shadow-sm border-gray-100'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <Link 
            href="/" 
            className="flex items-center text-xl sm:text-2xl font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span className="mr-1">🌈</span>
            <span>레인보우리치</span>
          </Link>
          
          {/* 데스크톱 네비게이션 */}
          <div className="hidden md:flex space-x-4 lg:space-x-8 items-center">
            {navItems.map((item) => (
              <Link 
                key={item.href}
                href={item.href} 
                className={`transition-all duration-200 text-sm lg:text-base relative ${
                  pathname === item.href 
                    ? 'text-blue-600 font-semibold' 
                    : 'text-gray-700 hover:text-blue-600'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-blue-600 rounded-full"></span>
                )}
              </Link>
            ))}
            
            {/* 구매하기 버튼 */}
            <Link 
              href="/order" 
              className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-3 lg:px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-200 font-semibold text-sm lg:text-base shadow-md hover:shadow-lg transform hover:scale-105"
            >
              <span className="hidden lg:inline">구매하기</span>
              <span className="lg:hidden">구매</span>
            </Link>
          </div>

          {/* 모바일 네비게이션 */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
} 