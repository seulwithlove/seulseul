#devlog #study  #nextauth #oauth2 #server 

# Auth.js study notes

- 새싹 풀스택 과정 강의
- [Auth.js - Docs](https://authjs.dev/getting-started) 

---

## 내어보기

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


---
## 의문갖기

- 

---

## 참고

- https://oauth.net/2/
- 

