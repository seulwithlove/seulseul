---
created: <% tp.date.now("YYYY-MM-DD") %>
modified: <% tp.date.now("YYYY-MM-DD") %>
---
#devlog #study  #project #nextjs #react #application 

# Social Bookmark Application
> Next.js(App Router), Prisma 기반 **풀스택 개발** 학습

- 청년취업사관학교 SeSAC 프로젝트 1
	- 2025. 8 ~ 2025. 10(진행중)
## 소셜 북마크 관리 플랫폼
- 사용자들이 북마크를 생성·공유, 다른 사용자의 북마크를 팔로우할 수 있는 웹 애플리케이션
- 취향에 맞는 정보를 손쉽게 찾고 공유하며 소통 가능

[🔗 github repository](https://github.com/seulwithlove/sesac-social-bookmark)

---

## 📝 주요 학습 내용

### 1. Next.js 15 App Router
- 서버 컴포넌트와 클라이언트 컴포넌트 구분
- Server Actions을 활용한 데이터 변경
- 동적 라우팅 및 병렬 라우트

### 2. NextAuth(Auth.js)
- 다중 OAuth 프로바이더 통합
- Credentials 기반 로그인 구현
- JWT 세션 관리
- 커스텀 인증 플로우

#### 🔑 NextAuth Credential flow
```
authorize() → signIn('credentials', data)
→ Credential Provider (check validation)
→ signIn callback (validate DB)
→ jwt callback (token)
→ session callback (session)
```
### 3. Prisma ORM
- 복잡한 관계형 데이터 모델링
- 마이그레이션 관리

### 4. 개발 도구
- Biome: ESLint + Prettier를 대체하는 빠른 툴체인
- Docker Compose: 개발 환경 컨테이너화
- pnpm: 효율적인 패키지 관리

## 🎨 UI/UX 특징
- 다크모드 지원: next-themes를 활용한 테마 전환
- 반응형 디자인: 모바일, 태블릿, 데스크톱 대응
- 접근성: Radix UI의 접근성 기능 활용
- 드래그 앤 드롭: dnd-kit을 활용한 직관적인 UI
- 토스트 알림: Sonner를 활용한 사용자 피드백

## 🔒 보안 기능
- bcrypt를 활용한 비밀번호 해싱
- 이메일 인증을 통한 계정 확인
- CSRF 보호 (NextAuth 내장)
- SQL Injection 방지 (Prisma ORM)
- XSS 방지 (React 자동 이스케이핑)

---

## 📱앱 플로우
### 🔐 Sign Page Flow
1. 회원가입 : `regist()` → DB 저장 → 이메일 인증 발송 → 이메일 확인 대기
```
- 회원가입 (Sign Up)
   SignForm → regist() → validate → DB.create
   → sendmailByFetch() → /api/sendmail → nodemailer
   → redirect(/sign/error?error=CheckEmail)

- 이메일 인증
   Email Link → /registcheck/[emailcheck] → DB.update(emailcheck: null)
   → redirect(/sign?email=xxx)
```

2. Credential 로그인(email) : `authorize()` → NextAuth Credential Provider → Session 생성
```
- 로그인 (Sign In - Credential)
   SignForm → authorize() → signIn('credentials', data)
   → auth.ts Credential provider → auth.ts signIn callback
   → DB 검증 (비밀번호, 탈퇴 여부, 이메일 인증)
   → jwt callback → session callback
   → Session 생성 → redirect(/bookcase)
```

3. SNS 로그인 : OAuth Provider → NextAuth Callback → 자동 회원가입/로그인
```
- SNS 로그인 (OAuth)
   Button → login(provider) → signIn(provider)
   → OAuth Provider → callback
   → auth.ts signIn callback → DB 조회/생성
   → jwt callback → session callback
   → Session 생성 → redirect(/bookcase)
```


### 🧭 Nav Flow
- Session 확인 → 로그인 상태 ? 프로필 : 로그인 
```
Nav 컴포넌트 (서버 컴포넌트)
→ auth() → Session 조회
→ didLogin = !!session?.user
→ 로그인: <Link href="/my"><Image src={profile} /></Link>
→ 로그아웃: <Link href="/sign">Login</Link>
```


### 👤 My Page Flow
1. 프로필 이미지 변경 : `updateProfileImage()` → 파일 업로드 → DB 업데이트
```
   ImageUploader → updateProfileImage()
   → validate → writeFile(public/profiles/)
   → DB.update(image) → revalidatePath()
   → return [null, mbr]
```

2. 닉네임 변경 : `updateNickname()` → DB 업데이트 → Session 업데이트
```
	LabelEditor → changeNickname() → updateNickname()
   → validate → DB.update(nickname)
   → update(mbr) → router.refresh()
```

3. 이메일 변경 : `sendEmailChangeCode()` → 새 이메일로 인증코드 발송 → `updateEmail()` → 이메일 변경
```
   Step 1: EmailChanger → sendEmailChangeCode()
   → validate → DB.update(emailcheck: 5자리코드)
   → sendmailByFetch(newEmail) → 새 이메일로 코드 발송
   → setTimeout(2분 후 emailcheck 삭제)
   
   Step 2: EmailChanger → updateEmail()
   → validate(emailChangeCode === DB.emailcheck)
   → DB.update(email: newEmail, emailcheck: null)
   → update(newMbr) → router.refresh()
```

