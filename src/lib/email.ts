import nodemailer from 'nodemailer';

// SMTP 설정
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false, // 587 포트는 false, 465 포트는 true
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

// 샘플 요청 이메일 전송 (관리자에게)
export async function sendSampleRequestNotification(requestData: {
  email: string;
  apartmentName: string;
  location?: string;
  message?: string;
  requestId: string;
}) {
  const adminEmail = process.env.ADMIN_EMAIL || 'rainbowcr55@gmail.com';
  
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: adminEmail,
    subject: `[레인보우리치] 새로운 샘플 요청 - ${requestData.apartmentName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          🎁 새로운 샘플 요청이 접수되었습니다
        </h2>
        
        <div style="background-color: #f8fafc; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #1e40af; margin-top: 0;">📋 요청 정보</h3>
          <p><strong>요청 ID:</strong> ${requestData.requestId}</p>
          <p><strong>이메일:</strong> ${requestData.email}</p>
          <p><strong>아파트 단지명:</strong> ${requestData.apartmentName}</p>
          <p><strong>지역:</strong> ${requestData.location || '미입력'}</p>
          <p><strong>추가 요청사항:</strong></p>
          <p style="background-color: white; padding: 10px; border-radius: 4px; border-left: 4px solid #2563eb;">
            ${requestData.message || '없음'}
          </p>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; border-left: 4px solid #f59e0b;">
          <h3 style="color: #92400e; margin-top: 0;">⏰ 처리 안내</h3>
          <p>24시간 이내에 <strong>${requestData.email}</strong>로 샘플 엑셀 파일을 전송해주세요.</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f1f5f9; border-radius: 8px;">
          <p style="color: #64748b; margin: 0;">
            레인보우리치 샘플 요청 시스템<br>
            문의: rainbowcr55@gmail.com
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('이메일 전송 실패:', error);
    return { success: false, error: error };
  }
}

// 샘플 요청 확인 이메일 전송 (고객에게)
export async function sendSampleRequestConfirmation(customerEmail: string, requestData: {
  apartmentName: string;
  requestId: string;
}) {
  const mailOptions = {
    from: process.env.SMTP_USER,
    to: customerEmail,
    subject: '[레인보우리치] 샘플 요청이 접수되었습니다',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 10px;">
          🎉 샘플 요청이 성공적으로 접수되었습니다!
        </h2>
        
        <div style="background-color: #f0f9ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #0369a1; margin-top: 0;">📦 요청 내용</h3>
          <p><strong>요청 ID:</strong> ${requestData.requestId}</p>
          <p><strong>아파트 단지:</strong> ${requestData.apartmentName}</p>
          <p><strong>요청 이메일:</strong> ${customerEmail}</p>
        </div>
        
        <div style="background-color: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
          <h3 style="color: #166534; margin-top: 0;">✅ 다음 단계</h3>
          <ul style="color: #374151;">
            <li>담당자가 요청하신 아파트 단지의 매물 정보를 수집합니다</li>
            <li><strong>24시간 이내</strong>에 샘플 엑셀 파일을 이메일로 전송해드립니다</li>
            <li>샘플을 확인하신 후 프로그램 구매를 고려해보세요</li>
          </ul>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="https://rainbowrich.site/order" 
             style="display: inline-block; background-color: #2563eb; color: white; padding: 12px 24px; 
                    text-decoration: none; border-radius: 6px; font-weight: bold;">
            프로그램 구매하기
          </a>
        </div>
        
        <div style="background-color: #fef3c7; padding: 15px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #92400e; margin-top: 0;">📞 문의사항</h3>
          <p>궁금한 점이 있으시면 언제든 연락주세요!</p>
          <p><strong>이메일:</strong> rainbowcr55@gmail.com</p>
          <p><strong>운영시간:</strong> 9:00-22:00 (주말, 공휴일 포함)</p>
        </div>
        
        <div style="text-align: center; margin-top: 30px; padding: 20px; background-color: #f1f5f9; border-radius: 8px;">
          <p style="color: #64748b; margin: 0;">
            레인보우리치 - 아파트 매물 엑셀 자동화 프로그램<br>
            <a href="https://rainbowrich.site" style="color: #2563eb;">https://rainbowrich.site</a>
          </p>
        </div>
      </div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    return { success: true };
  } catch (error) {
    console.error('고객 확인 이메일 전송 실패:', error);
    return { success: false, error: error };
  }
} 