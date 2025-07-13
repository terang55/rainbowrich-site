# CLAUDE.md

이 파일은 Claude Code (claude.ai/code)가 이 저장소에서 작업할 때 필요한 가이드를 제공합니다.

## 필수 명령어

**개발:**
- `npm run dev` - Turbopack을 사용한 개발 서버 시작
- `npm run build` - 프로덕션 애플리케이션 빌드
- `npm run start` - 프로덕션 서버 시작
- `npm run lint` - ESLint로 코드 품질 검사

**현재 이 프로젝트에는 테스트 스위트가 구성되어 있지 않습니다.**

## 프로젝트 구조

레인보우리치 한국 부동산 투자 플랫폼을 위한 Next.js 15.3.3 App Router 애플리케이션입니다.

### 핵심 기술 스택
- **프레임워크**: Next.js 15.3.3 (App Router)
- **언어**: TypeScript 5 (strict mode)
- **스타일링**: Tailwind CSS 4
- **콘텐츠 관리**: Notion API 연동
- **이메일**: Nodemailer (문의 폼용)
- **배포**: Vercel 최적화

### 주요 애플리케이션 구조

**콘텐츠 연동:**
- `/src/lib/notion.ts` - Notion API 클라이언트 및 콘텐츠 가져오기 로직
- `/src/components/NotionRenderer.tsx` - Notion 콘텐츠 블록 렌더링
- 홈페이지 (`/src/app/page.tsx`)는 Notion과 연동하여 동적 콘텐츠 제공

**API 엔드포인트:**
- `/src/app/api/order/route.ts` - 제품 구매 요청 처리
- `/src/app/api/sample-request/route.ts` - 샘플 다운로드 요청 관리
- `/src/lib/email.ts` - 이메일 서비스 유틸리티

**페이지:**
- `/src/app/page.tsx` - Notion 기반 동적 콘텐츠 홈페이지
- `/src/app/features/page.tsx` - 제품 기능 소개
- `/src/app/blog/page.tsx` - 블로그/업데이트 콘텐츠
- `/src/app/order/` - 구매 플로우 페이지들
- `/src/app/sample/page.tsx` - 샘플 다운로드 페이지

**내비게이션:**
- `/src/components/NavBar.tsx` - 데스크톱 내비게이션
- `/src/components/MobileNav.tsx` - 반응형 모바일 내비게이션

### SEO 및 성능 설정

**`/src/app/layout.tsx`의 중요 SEO 설정:**
- 25개 이상의 부동산 키워드가 포함된 한국어 메타데이터
- Open Graph 및 Twitter Card 최적화
- SoftwareApplication, Organization, WebSite을 위한 구조화 데이터 (JSON-LD)
- 네이버 웹마스터 인증 메타 태그

**`next.config.ts`의 Next.js 설정:**
- 보안 헤더 (X-Content-Type-Options, X-Frame-Options 등)
- WebP/AVIF를 지원하는 이미지 최적화
- Notion, Unsplash, AWS S3용 원격 이미지 패턴
- sitemap 및 robots.txt용 캐싱 헤더

### 필수 환경 변수
```bash
NOTION_API_KEY=secret_...        # Notion API 연동
NOTION_MAIN_PAGE_ID=page_id_...  # 메인 페이지 콘텐츠 소스
EMAIL_API_KEY=email_secret_...   # 이메일 서비스 (설정된 경우)
```

### 중요한 개발 가이드라인

**Cursor 규칙 준수:**
- `.cursor/rules/nextjs-frontend-rules.mdc`에 포괄적인 Cursor 규칙이 있음
- 명시적 사용자 허가 없이 파일 삭제나 git 커밋 금지
- 한국어 UX 표준 준수 - 모든 사용자 대면 텍스트는 한국어로
- Tailwind CSS 클래스 순서 유지: layout → background → text → spacing → borders → effects → transitions
- 모바일 우선 반응형 디자인 패턴 사용
- 엄격한 TypeScript 패턴 및 import 구조 준수

**한국어 현지화:**
- 타겟 사용자는 한국 부동산 투자자
- 모든 콘텐츠, 오류 메시지, UI 텍스트는 한국어
- 부동산 투자 관련 한국어 검색어에 최적화된 SEO
- 구조화 데이터에 한국 비즈니스 컨텍스트 포함

**성능 요구사항:**
- 터치 친화적 인터페이스를 위한 모바일 우선 디자인 (최소 44px 터치 타겟)
- 모든 이미지에 next/image 사용한 이미지 최적화
- SEO를 위한 Core Web Vitals 최적화가 중요

**콘텐츠 관리:**
- 홈페이지 콘텐츠는 Notion API에서 동적으로 가져옴
- Notion 블록은 커스텀 NotionRenderer 컴포넌트를 통해 렌더링
- Notion의 이미지는 Next.js Image 컴포넌트를 통해 자동 최적화