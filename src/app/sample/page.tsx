'use client';

import { useState } from 'react';

export default function SamplePage() {
  const [formData, setFormData] = useState({
    email: '',
    apartmentName: '',
    location: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.email || !formData.apartmentName) {
      alert('이메일과 아파트 단지명은 필수 입력사항입니다.');
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/sample-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
        // 폼 리셋
        setFormData({
          email: '',
          apartmentName: '',
          location: '',
          message: ''
        });
      } else {
        throw new Error('신청 처리 중 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('샘플 신청 오류:', error);
      setSubmitStatus('error');
      alert('신청 처리 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div className="max-w-2xl mx-auto px-4 py-12">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">신청이 완료되었습니다!</h1>
          <p className="text-xl text-gray-600 mb-4">24시간 이내에 샘플 엑셀 파일을 이메일로 보내드리겠습니다.</p>
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-8">
            <p className="text-green-800 text-sm">
              📧 확인 이메일이 고객님의 이메일 주소로 전송되었습니다.<br />
              이메일을 받지 못하셨다면 스팸함을 확인해보시거나 rainbowcr55@gmail.com으로 연락주세요.
            </p>
          </div>
          
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-bold text-gray-900 mb-4">📧 다음 단계</h2>
            <div className="space-y-2 text-gray-700">
              <p>• 담당자가 요청하신 아파트 단지의 매물 정보를 수집합니다</p>
              <p>• 24시간 이내에 샘플 엑셀 파일을 이메일로 전송해드립니다</p>
              <p>• 샘플을 확인하신 후 프로그램 구매를 고려해보세요</p>
            </div>
          </div>

          <div className="space-x-4">
            <button 
              onClick={() => setSubmitStatus('idle')}
              className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              추가 신청하기
            </button>
            <a 
              href="/order"
              className="bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-gray-700 transition-colors inline-block"
            >
              프로그램 구매하기
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">무료 샘플 신청</h1>
        <p className="text-xl text-gray-600">원하는 아파트 단지의 샘플 엑셀 파일을 받아보세요</p>
      </div>

      {/* 샘플 서비스 안내 */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">🎁 무료 샘플 서비스</h2>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">원하는 아파트 단지의 실제 매물 데이터를 엑셀로 제공</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">프로그램으로 수집한 실제 데이터 형태를 미리 확인</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">24시간 이내 이메일로 무료 전송</p>
          </div>
          <div className="flex items-start space-x-3">
            <span className="text-green-500">✅</span>
            <p className="text-gray-700">구매 전 프로그램의 효과를 직접 체험</p>
          </div>
        </div>
      </div>

      {/* 신청 폼 */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">📝 샘플 신청 정보</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                이메일 주소 *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example@email.com"
              />
              <p className="text-xs text-gray-500 mt-1">샘플 엑셀 파일을 받을 이메일 주소입니다.</p>
            </div>

            <div>
              <label htmlFor="apartmentName" className="block text-sm font-medium text-gray-700 mb-1">
                아파트 단지명 *
              </label>
              <input
                type="text"
                id="apartmentName"
                name="apartmentName"
                required
                value={formData.apartmentName}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 래미안에스티움, 고덕그라시움 등"
              />
              <p className="text-xs text-gray-500 mt-1">정확한 아파트 단지명을 입력해주세요.</p>
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">
                지역 정보
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="예: 서울 강남구, 경기 성남시 등"
              />
              <p className="text-xs text-gray-500 mt-1">더 정확한 검색을 위해 지역 정보를 추가해주세요.</p>
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                추가 요청사항
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="추가 요청사항이나 궁금한점 있으시면 입력해주세요."
              />
            </div>
          </div>
        </div>

        {/* 샘플 안내 */}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-4">⏰ 처리 과정</h2>
          <div className="space-y-3">
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">1</span>
              <p className="text-gray-700">샘플 신청서 접수</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">2</span>
              <p className="text-gray-700">담당자가 해당 아파트 단지 매물 정보 수집</p>
            </div>
            <div className="flex items-start space-x-3">
              <span className="flex-shrink-0 w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">3</span>
              <p className="text-gray-700">24시간 이내 엑셀 파일로 이메일 전송</p>
            </div>
          </div>
        </div>

        {/* 신청 버튼 */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-4 px-6 rounded-lg font-bold text-lg transition-colors ${
            isSubmitting
              ? 'bg-gray-400 text-gray-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {isSubmitting ? '신청 처리 중...' : '무료 샘플 신청하기'}
        </button>
      </form>

      {/* 추가 안내 */}
      <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">💡 안내사항</h3>
        <div className="space-y-2 text-sm text-gray-600">
          <p>• 샘플은 1인 1회 무료로 제공됩니다</p>
          <p>• 실제 매물 데이터를 기반으로 한 샘플을 제공합니다</p>
          <p>• 샘플 확인 후 프로그램 구매 여부를 결정하실 수 있습니다</p>
          <p>• 기술적인 문의사항은 언제든 연락주세요</p>
        </div>
      </div>

      {/* 문의 안내 */}
      <div className="mt-8 text-center text-sm text-gray-600">
        <p>샘플 관련 문의: rainbowcr55@gmail.com</p>
        <p> 9:00-22:00 (주말, 공휴일도 언제든지 연락주세요.)</p>
      </div>
    </div>
  );
} 