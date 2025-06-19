import { NextRequest, NextResponse } from 'next/server';

// 주문번호 생성 함수
function generateOrderNumber(): string {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const hour = String(now.getHours()).padStart(2, '0');
  const minute = String(now.getMinutes()).padStart(2, '0');
  const random = Math.floor(Math.random() * 100).toString().padStart(2, '0');
  
  return `RR${year}${month}${day}${hour}${minute}${random}`;
}

// 이메일 발송 함수 (현재는 콘솔 로그만, 나중에 실제 이메일 서비스 연동)
async function sendOrderEmail(orderData: {
  name: string;
  email: string;
  phone: string;
}, orderNumber: string) {
  // 실제 이메일 발송 로직은 나중에 구현
  // 현재는 콘솔에 로그만 출력
  console.log('=== 주문 이메일 발송 ===');
  console.log('받는이:', orderData.email);
  console.log('주문번호:', orderNumber);
  console.log('주문자:', orderData.name);
  console.log('연락처:', orderData.phone);
  console.log('계좌정보: 우리은행 1002-852-776368 (이건희)');
  console.log('입금액: 50,000원');
  console.log('입금자명: ' + orderData.name);
  
  // 관리자에게도 알림
  console.log('=== 관리자 알림 ===');
  console.log('새 주문이 접수되었습니다.');
  console.log('관리자 이메일: rainbowcr55@gmail.com');
  
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, agreement } = body;

    // 필수 필드 검증
    if (!name || !email || !phone || !agreement) {
      return NextResponse.json(
        { error: '필수 정보를 모두 입력해주세요.' },
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

    // 주문번호 생성
    const orderNumber = generateOrderNumber();

    // 주문 데이터
    const orderData = {
      orderNumber,
      name,
      email,
      phone,
      product: '레인보우리치 프로그램',
      price: 50000,
      orderDate: new Date().toISOString(),
      status: 'pending_payment'
    };

    // 이메일 발송 시도
    try {
      await sendOrderEmail(orderData, orderNumber);
    } catch (emailError) {
      console.error('이메일 발송 오류:', emailError);
      // 이메일 발송 실패해도 주문은 성공으로 처리
    }

    // 주문 성공 응답
    return NextResponse.json({
      success: true,
      orderNumber,
      message: '주문이 성공적으로 접수되었습니다.',
      accountInfo: {
        bank: '우리은행',
        account: '1002-852-776368',
        holder: '이건희',
        amount: 50000,
        depositorName: name
      }
    });

  } catch (error) {
    console.error('주문 처리 오류:', error);
    return NextResponse.json(
      { error: '주문 처리 중 오류가 발생했습니다.' },
      { status: 500 }
    );
  }
} 