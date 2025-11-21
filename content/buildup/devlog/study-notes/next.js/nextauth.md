---
created: 2025-10-10T18:08
updated: 2025-11-14T16:53
---
#devlog #study  #nextauth #oauth2 #server #jwt

# Auth.js  📝

- [Auth.js - Docs](https://authjs.dev/getting-started) 
	- *LLM 활용 내용 보충*

---
# 의문갖기

## 세션 만료 시간을 연장하려면 `access_token`을 매번 새로 발급?
### 문제 :
- 로그인상태로 세션 만료 시간을 초과하면 jwt 토큰 관련 에러가 발생
```typescript
// middleware.ts
if (!token) {
  // 여기로 빠짐 → 로그인 페이지로 강제 이동
  return NextResponse.redirect(
    new URL(`/sign?redirectTo=${pathname}`, req.url)
  );
}
```
- 매 요청마다 `access_token`을 발급하면:
	- 불필요한 서버 작업을 하게됨
### 해결 :
> middleware에서 세션만료시간을 체크 & `REFRESH_THRESHHOLD`에 맞춰 쿠키를 새로 구움
#### 🔑 1. auth.ts - NextAuth 설정
```ts
export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",  // 👈 중요!
          response_type: "code",
        },
      },
    }),
  ],
});
```
- `access_type: "offline"` 역할
	- Google OAuth에서 **Refresh Token**을 받기 위한 설정
	- 이게 없으면 access_token만 받아와서 세션 만료시 재로그인 필요
	- `offline`으로 설정하면 토큰 갱신 가능
#### 🛡️ 2. middleware.ts - 핵심 로직
- 기존 token 정보를 **재인코딩**해서 만료 시간을 연장
	- `encode()`함수가 새로운 jwt를 생성
	- 이걸 쿠키로 다시 구워서 브라우저에 전달
1) 토큰 가져오기 -> 로그인 체크 -> 만료 시간 체크
```ts
const token = await getToken({ req, secret: SECRET });

if (!token && NEED_COOKIES.includes(pathname)) 
  return NextResponse.next();

if (!token)
  return NextResponse.redirect(
    new URL(`/sign?redirectTo=${pathname}`, req.url)
  );

const REFRESH_THRESHOLD = 10 * 60 * 1000; // 10분
const exp = token.exp ? token.exp * 1000 : 0;

// 만료 임박 : 10분 이내로 접근했을 경우에만 갱신 → 쿠키 새로 구움
if (exp - Date.now() < MAX_AGE * 1000 - REFRESH_THRESHOLD) {
  const newToken = await encode({ ... });
  res.cookies.set({ ... });
}
```

2) 쿠키 새로 굽기
```ts
const res = NextResponse.next();
const newToken = await encode({
  token,              // 기존 토큰 정보 유지
  secret: SECRET,
  salt: SALT,
  maxAge: MAX_AGE,    // 만료 시간 재설정
});

// 쿠키굽기
res.cookies.set({
  name: SALT,      
  value: newToken, // new encoded token
  maxAge: MAX_AGE, // 'undefined'면 브라우저 닫을때까지 유지 - e.g. 주차비 정산앱
  httpOnly: true,  // XSS방어 - JavaScript로 접근 불가
  secure: process.env.NODE_ENV === "production", // HTTPS만
  sameSite: "lax", // CSRF 방어
  path: "/",
});
```


📊 실제 동작 타임라인
```text
1월 1일 00:00 - 로그인
├─ 쿠키 생성: 만료 1월 31일 00:00
│
1월 5일 10:00 - 페이지 접속
├─ Middleware 실행
├─ 남은 시간: 25일 14시간
├─ 조건 체크: 25일 < (30일 - 10분)? YES
├─ ✅ 쿠키 새로 구움
└─ 새 만료: 2월 4일 10:00
│
1월 10일 15:00 - 또 접속
├─ Middleware 실행
├─ 남은 시간: 24일 19시간
├─ ✅ 쿠키 새로 구움
└─ 새 만료: 2월 9일 15:00
```



---

# 내어보기

## OAuth2
- 다른 서비스 계정으로 로그인을 허용하는 표준 프로토콜
![[Screenshot 2025-09-02 at 17.23.37.png]]
> Client : Next.js app / resource Owner : User / Authorization Server : Google server / Resource Server : Google API
### 기본 흐름
| RFC 단계                                | 실제 단계                                            |
| ------------------------------------- | ------------------------------------------------ |
| (A) Authorization Request             | ① 로그인 버튼 → Provider로 이동(권한 요청 시작)                |
| (B) Authorization Grant               | ② 사용자가 동의 → 권한 부여 사실 확정                          |
| (C) Authorization Grant → Auth Server | ③ 클라이언트가 그 “권한”(=코드)을 서버로 제출(코드 교환)              |
| (D) Access Token                      | ④ 서버가 코드를 검증하고 액세스 토큰 발급                         |
| (E) Access Token → Resource Server    | ⑤ 액세스 토큰으로 API 요청                                |
| (F) Protected Resource                | ⑥ 보호 자원(프로필 등) 응답 : 세션/JWT 생성 → 쿠키(HttpOnly)에 저장 |
- **내 앱이 직접 사용자 비밀번호를 받지 않고, 토큰을 통해 간접적으로 로그인 상태를 확인**

### Access Token / Refresh Token
- Access Token 
	- 유효기간이 짧음 (예: 1시간)
	- API 요청할때 `나는 인증된 사용자`라고 증명하는 용도
- Refresh Token
	- Access Token 만료됐을때 새로 발급받는데 사용
	- 서버에서 안전하게 관리해야 함

### OAuth2 Provider에서 Access Token으로 받아온 정보를 관리하는 방식
> Auth.js 기준
 
#### 세션 DB 방식
- 서버가 DB에 '사용자 로그인 상태'를 저장해둠
- 브라우저에서 세션 ID를 쿠키로 내려줌
- 다음 요청에서 쿠리를 보고 DB에서 해당 유저 정보를 찾아옴

#### JWT 방식(Auth.js 기본)
- 서버가 사용자 정보를 바탕으로 `JWT(Json Web Token)`을 발급
- JWT는 '이 유저는 누구다' 라는 정보를 암호화된 서명으로 보증
- 브라우저 쿠키에 JWT를 넣어줌
- 다음 요청에서 서버는 JWT만 검증 → DB 조회 불필요

> **Access Token** = Provider(구글/깃허브)와 통신용
> **JWT/세션** = 우리 앱 내부에서 사용자 인증을 관리하기 위한 도구


### 브라우저에 데이터 저장하는 방법
- 쿠키(HttpOnly) : 보안상 안전, 자동으로 요청에 붙음(Auth.js 기본)
- Local storage : 직접 JS로 접근해야하고 해킹(XSS)에 취약 → 요즘은 안씀


## NextAuth.js
> - 서버에서 세션을 쿠키 기반으로 관리 
> - 클라이언트에서 이 세션을 읽어 로그인/로그아웃 상태를 알수 있게 함

### validator

---
# 참고

- https://oauth.net/2/
- 
