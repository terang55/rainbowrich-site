import { NextRequest, NextResponse } from 'next/server';

// 샘플 요청번호 생성 함수
function generateSampleRequestId(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  
  return `SAMPLE${year}${month}${day}${hour}${minute}${random}`;
}

// 샘플 요청 로그 기록 함수
function logSampleRequest(requestData: {
  email: string;
  apartmentName: string;
  location?: string;
  message?: string;
}, requestId: string) {
  // 콘솔 로그로 샘플 신청 정보 기록
  console.log('=== 샘플 신청 접수 ===');
  console.log('요청번호:', requestId);
  console.log('신청자 이메일:', requestData.email);
  console.log('아파트 단지명:', requestData.apartmentName);
  console.log('지역 정보:', requestData.location || '없음');
  console.log('추가 요청사항:', requestData.message || '없음');
  console.log('신청 시간:', new Date().toLocaleString('ko-KR'));
  console.log('관리자 이메일: rainbowcr55@gmail.com');
  console.log('📧 이메일 기능은 현재 비활성화되어 있습니다. 수동으로 처리해주세요.');
  
  return { success: true };
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    console.log('=== 받은 요청 데이터 ===', body);
    const { email, apartmentName, location, message } = body;

    // 필수 필드 검증
    if (!email || !apartmentName) {
      return NextResponse.json(
        { error: '이메일과 아파트 단지명은 필수 입력사항입니다.' },
        { status: 400 }
      );
    }

    // 이메일 형식 검증
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: '올바른 이메일 주소를 입력해주세요.' },
        { status: 400 }
      );
    }

    // 샘플 요청번호 생성
    const requestId = generateSampleRequestId();

    // 샘플 요청 데이터
    const requestData = {
      requestId,
      email,
      apartmentName,
      location: location || '',
      message: message || '',
      requestDate: new Date().toISOString(),
      status: 'pending'
    };

    // 샘플 요청 정보 로그 기록
    logSampleRequest(requestData, requestId);

    // 샘플 요청 성공 응답
    return NextResponse.json({
      success: true,
      requestId,
      message: '샘플 신청이 성공적으로 접수되었습니다.',
      estimatedDelivery: '24시간 이내',
      adminContact: 'rainbowcr55@gmail.com'
    });

  } catch (error) {
    console.error('샘플 신청 처리 오류:', error);
    return NextResponse.json(
      { error: '샘플 신청 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 