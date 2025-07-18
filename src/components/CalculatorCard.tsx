'use client';

import Link from 'next/link';

interface CalculatorCardProps {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  hoverColor: string;
  features: string[];
  popular?: boolean;
}

export default function CalculatorCard({
  id,
  title,
  description,
  icon,
  color,
  hoverColor,
  features,
  popular = false
}: CalculatorCardProps) {
  return (
    <Link
      href={`/tools/${id}`}
      className="group relative bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden"
    >
      {popular && (
        <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold z-10">
          인기
        </div>
      )}
      
      <div className="p-6">
        <div className={`inline-flex items-center justify-center w-12 h-12 ${color} text-white rounded-lg mb-4 group-hover:scale-110 transition-transform`}>
          <span className="text-2xl">{icon}</span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-2">
          {description}
        </p>
        
        <ul className="space-y-2 mb-6">
          {features.map((feature, index) => (
            <li key={index} className="flex items-center text-sm text-gray-700">
              <span className="text-green-500 mr-2">✓</span>
              {feature}
            </li>
          ))}
        </ul>
        
        <div className={`inline-flex items-center px-4 py-2 ${color} ${hoverColor} text-white rounded-lg font-medium transition-colors group-hover:shadow-lg`}>
          계산하기
          <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
        </div>
      </div>
    </Link>
  );
}