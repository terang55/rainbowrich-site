# 📧 이메일 전송 설정 가이드

샘플 요청 시 자동으로 이메일을 전송하기 위한 설정 방법입니다.

## 1. 환경변수 파일 생성

프로젝트 루트에 `.env.local` 파일을 생성하고 다음 내용을 추가하세요:

```bash
# Notion API 설정
NOTION_API_KEY=your_notion_api_key_here
NOTION_MAIN_PAGE_ID=your_main_page_id_here
NOTION_UPDATES_PAGE_ID=your_updates_page_id_here
NOTION_CONTACT_PAGE_ID=your_contact_page_id_here

# 이메일 SMTP 설정 (Gmail 사용)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_gmail_app_password_here
ADMIN_EMAIL=your_email@gmail.com
```

## 2. Gmail 앱 비밀번호 생성

Gmail에서 앱 비밀번호를 생성해야 합니다:

### 단계별 설정:

1. **Gmail 계정 보안 설정**
   - https://myaccount.google.com/security 접속
   - 본인의 Gmail 계정으로 로그인

2. **2단계 인증 활성화**
   - "2단계 인증" 섹션에서 활성화
   - 이미 활성화되어 있다면 다음 단계로

3. **앱 비밀번호 생성**
   - "2단계 인증" → "앱 비밀번호" 클릭
   - "앱 선택" → "메일" 선택
   - "기기 선택" → "기타" → "레인보우리치 웹사이트" 입력
   - "생성" 클릭

4. **생성된 비밀번호 복사**
   - 16자리 앱 비밀번호가 생성됩니다 (예: abcd efgh ijkl mnop)
   - 이 비밀번호를 `.env.local` 파일의 `SMTP_PASS`에 입력

## 3. 환경변수 파일 예시

```bash
# 완성된 .env.local 파일 예시
NOTION_API_KEY=your_notion_api_key_here
NOTION_MAIN_PAGE_ID=your_main_page_id_here
NOTION_UPDATES_PAGE_ID=your_updates_page_id_here
NOTION_CONTACT_PAGE_ID=your_contact_page_id_here

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_16_digit_app_password_here
ADMIN_EMAIL=your_email@gmail.com
```

## 4. 테스트

설정 완료 후:

1. 개발 서버 재시작: `npm run dev`
2. 웹사이트에서 샘플 신청 테스트
3. 콘솔에서 이메일 전송 결과 확인

## 5. 이메일 전송 흐름

샘플 신청 시 다음 2개의 이메일이 자동 전송됩니다:

### 📨 관리자 알림 이메일
- 제목: [레인보우리치] 새로운 샘플 요청 - {아파트명}
- 내용: 신청자 정보, 요청 내용, 처리 안내

### 📨 고객 확인 이메일 (신청자)
- 제목: [레인보우리치] 샘플 요청이 접수되었습니다
- 내용: 접수 확인, 처리 과정, 문의 정보

## 6. 문제 해결

### 이메일 전송 실패 시:
1. 콘솔 로그에서 오류 메시지 확인
2. Gmail 앱 비밀번호 재생성
3. 2단계 인증 활성화 상태 확인
4. SMTP 설정 정보 재확인

### 보안 경고 발생 시:
- Gmail에서 "보안 수준이 낮은 앱의 액세스" 허용 (권장하지 않음)
- 대신 앱 비밀번호 사용 권장

## 7. 참고사항

- `.env.local` 파일은 git에 커밋하지 마세요
- 앱 비밀번호는 안전하게 보관하세요
- 이메일 전송 실패 시에도 샘플 신청은 접수됩니다
- 백업용으로 콘솔 로그도 함께 출력됩니다

## ⚠️ 보안 주의사항

- 실제 API 키와 비밀번호는 절대 GitHub에 업로드하지 마세요
- `.env.local` 파일은 `.gitignore`에 포함되어 있어야 합니다
- 프로덕션 환경에서는 Vercel 환경변수를 사용하세요 