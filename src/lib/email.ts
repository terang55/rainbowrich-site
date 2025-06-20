import nodemailer from 'nodemailer';

// 이메일 전송을 위한 유틸리티 함수들

interface SampleRequestData {
  email: string;
  apartmentName: string;
  location?: string;
  message?: string;
  requestId: string;
}

interface EmailResponse {
  success: boolean;
  error?: Error | unknown;
}

// Gmail SMTP 설정
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.SMTP_PORT || '587'),
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
};

// 관리자에게 샘플 요청 알림 이메일 전송
export async function sendSampleRequestNotification(data: SampleRequestData): Promise<EmailResponse> {
  try {
    const transporter = createTransporter();
    const adminEmail = process.env.ADMIN_EMAIL || 'rainbowcr55@gmail.com';

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: adminEmail,
      subject: '[레인보우리치] 새로운 무료 샘플 신청',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">🌈 레인보우리치 무료 샘플 신청</h2>
          
          <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3>신청 정보</h3>
            <p><strong>요청번호:</strong> ${data.requestId}</p>
            <p><strong>신청자 이메일:</strong> ${data.email}</p>
            <p><strong>아파트 단지명:</strong> ${data.apartmentName}</p>
            <p><strong>지역:</strong> ${data.location || '없음'}</p>
            <p><strong>추가 요청사항:</strong> ${data.message || '없음'}</p>
            <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          </div>
          
          <p>빠른 시일 내에 고객에게 연락해주세요.</p>
          <p>관리자 이메일: ${adminEmail}</p>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ 관리자 알림 이메일 전송 성공:', result.messageId);
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ 관리자 알림 이메일 전송 실패:', error);
    return { success: false, error };
  }
}

// 고객에게 샘플 요청 확인 이메일 전송
export async function sendSampleRequestConfirmation(
  customerEmail: string, 
  data: { apartmentName: string; requestId: string }
): Promise<EmailResponse> {
  try {
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.SMTP_USER,
      to: customerEmail,
      subject: '[레인보우리치] 무료 샘플 신청이 접수되었습니다',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #3B82F6;">🌈 레인보우리치</h2>
          
          <p>안녕하세요! 레인보우리치입니다.</p>
          
          <div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
            <h3 style="color: #16a34a; margin-top: 0;">✅ 무료 샘플 신청이 접수되었습니다</h3>
            <p><strong>아파트 단지명:</strong> ${data.apartmentName}</p>
            <p><strong>요청번호:</strong> ${data.requestId}</p>
            <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
          </div>
          
          <div style="background: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h4 style="color: #0369a1; margin-top: 0;">📞 다음 단계</h4>
            <ul style="color: #374151;">
              <li>24시간 이내에 담당자가 연락드릴 예정입니다</li>
              <li>무료 샘플 프로그램을 이메일로 전송해드립니다</li>
              <li>사용 방법과 주요 기능을 안내해드립니다</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0; color: #92400e;">
              <strong>💡 참고:</strong> 무료 샘플은 기본 기능만 제공됩니다. 
              전체 기능 이용을 원하시면 정식 버전을 구매해주세요.
            </p>
          </div>
          
          <hr style="margin: 30px 0; border: none; border-top: 1px solid #e5e7eb;">
          
          <div style="text-align: center; color: #6b7280; font-size: 14px;">
            <p>문의사항이 있으시면 언제든 연락주세요!</p>
            <p>📧 이메일: rainbowcr55@gmail.com</p>
            <p>🌐 웹사이트: <a href="https://rainbowrich.site" style="color: #3B82F6;">rainbowrich.site</a></p>
            <p style="margin-top: 20px;">© 2024 레인보우리치. All rights reserved.</p>
          </div>
        </div>
      `,
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('✅ 고객 확인 이메일 전송 성공:', result.messageId);
    
    return { success: true };
    
  } catch (error) {
    console.error('❌ 고객 확인 이메일 전송 실패:', error);
    return { success: false, error };
  }
}

// 이메일 설정 테스트 함수
export async function testEmailConnection(): Promise<boolean> {
  try {
    const transporter = createTransporter();
    await transporter.verify();
    console.log('✅ 이메일 서버 연결 성공');
    return true;
  } catch (error) {
    console.error('❌ 이메일 서버 연결 실패:', error);
    return false;
  }
}

// 실제 이메일 서비스 연동을 위한 설정 함수들 (추후 구현)
export async function setupEmailService() {
  // Gmail API, SendGrid, AWS SES 등의 설정
  // 환경변수에서 API 키 등을 가져와서 설정
  console.log('이메일 서비스 설정 준비 중...');
}

// 이메일 템플릿 생성 함수
export function createSampleRequestEmailTemplate(data: SampleRequestData): string {
  return `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <title>레인보우리치 무료 샘플 신청</title>
    </head>
    <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
        <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #3B82F6;">🌈 레인보우리치 무료 샘플 신청</h2>
            
            <div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3>신청 정보</h3>
                <p><strong>요청번호:</strong> ${data.requestId}</p>
                <p><strong>신청자 이메일:</strong> ${data.email}</p>
                <p><strong>아파트 단지명:</strong> ${data.apartmentName}</p>
                <p><strong>지역:</strong> ${data.location || '없음'}</p>
                <p><strong>추가 요청사항:</strong> ${data.message || '없음'}</p>
                <p><strong>신청 시간:</strong> ${new Date().toLocaleString('ko-KR')}</p>
            </div>
            
            <p>빠른 시일 내에 연락드리겠습니다.</p>
            <p>문의: rainbowcr55@gmail.com</p>
        </div>
    </body>
    </html>
  `;
} 