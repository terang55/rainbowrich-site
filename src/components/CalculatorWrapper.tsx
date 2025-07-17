'use client';

import { useState, useEffect } from 'react';

interface CalculatorWrapperProps {
  children: React.ReactNode;
}

export default function CalculatorWrapper({ children }: CalculatorWrapperProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-500">계산기를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}