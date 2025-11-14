---
created: 2025-10-14T16:38
updated: 2025-11-14T16:53
---
#devlog #study  #nextjs #runtime #backend 

# nextjs-runtime

---

# 내어보기

## Node.js
- 서버에서 JS를 실행할 수 있게 함
- `server action` 실행, API Routes(`app/api/*/route.ts`)
- DB연결, 무거운 서버 로직(파일 읽기/쓰기)

## Edge Runtime
- 가벼운 서버 실행환경 (e.g. Vercel)
- Node 보다 제한적이지만, 전 세계 CDN에 가까운 위치(edge)에서 실행돼서 응답이 빠름
- `middleware.ts` 실행
	- 요청(Request)이 들어올때 가장 먼저 실행되서 빠르게 Redirect, 인증체크 등을 할수 있음
- 일부 Route handler(`export const runtime = 'edge'`)
- `fetch`, Web API 스타일의 API 호출
- 제한사항
	- 파일 시스템 접근 X
	- 특정 Node.js API (`fs`, `net`, `child_process`) X

### Middleware
- 클라이언트 Request - Server Response 사이에서 동작하는 코드
- Next.js에서 페이지 렌더링 전에 실행되면서 요청을 가로채서 조건에 따라 리다이렉트, 응답 수정 등을 함
- 특징
	- 항상 Edge에서 실행
	- page/route 들어가기 전에 실행
	- 인증체크, i18n(언어 라우팅), A/B 테스트 등에 자주 사용

