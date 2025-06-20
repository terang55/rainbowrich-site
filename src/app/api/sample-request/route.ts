import { NextRequest, NextResponse } from 'next/server';
import { sendSampleRequestNotification, sendSampleRequestConfirmation } from '@/lib/email';

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

// 샘플 요청 이메일 전송 함수
async function sendSampleRequestEmail(requestData: {
  email: string;
  apartmentName: string;
  location?: string;
  message?: string;
}, requestId: string) {
  try {
    // 관리자에게 알림 이메일 전송
    const adminResult = await sendSampleRequestNotification({
      email: requestData.email,
      apartmentName: requestData.apartmentName,
      location: requestData.location,
      message: requestData.message,
      requestId: requestId
    });

    // 고객에게 확인 이메일 전송  
    const customerResult = await sendSampleRequestConfirmation(requestData.email, {
      apartmentName: requestData.apartmentName,
      requestId: requestId
    });

    // 이메일 전송 결과 로그
    console.log('=== 이메일 전송 결과 ===');
    console.log('관리자 알림 이메일:', adminResult.success ? '✅ 성공' : '❌ 실패');
    console.log('고객 확인 이메일:', customerResult.success ? '✅ 성공' : '❌ 실패');
    
    if (!adminResult.success) {
      console.error('관리자 이메일 전송 실패:', adminResult.error);
    }
    if (!customerResult.success) {
      console.error('고객 이메일 전송 실패:', customerResult.error);
    }

    // 백업용 콘솔 로그
    console.log('=== 샘플 신청 접수 ===');
    console.log('요청번호:', requestId);
    console.log('신청자 이메일:', requestData.email);
    console.log('아파트 단지명:', requestData.apartmentName);
    console.log('지역 정보:', requestData.location || '없음');
    console.log('추가 요청사항:', requestData.message || '없음');
    console.log('신청 시간:', new Date().toLocaleString('ko-KR'));
    
    return { success: true, adminEmail: adminResult.success, customerEmail: customerResult.success };

  } catch (error) {
    console.error('이메일 전송 중 오류 발생:', error);
    
    // 오류 발생 시에도 백업용 콘솔 로그는 출력
    console.log('=== 샘플 신청 접수 (이메일 전송 실패) ===');
    console.log('요청번호:', requestId);
    console.log('신청자 이메일:', requestData.email);
    console.log('아파트 단지명:', requestData.apartmentName);
    console.log('관리자 이메일: rainbowcr55@gmail.com');
    console.log('⚠️ 이메일 전송에 실패했습니다. 수동으로 처리해주세요.');
    
    return { success: false, error: error };
  }
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

    // 관리자에게 알림 이메일 발송 시도
    try {
      await sendSampleRequestEmail(requestData, requestId);
    } catch (emailError) {
      console.error('이메일 발송 오류:', emailError);
      // 이메일 발송 실패해도 요청은 성공으로 처리
    }

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