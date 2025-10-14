---
created: 2025-09-03T17:33
updated: 2025-10-14T17:03
---
#devlog #study  #nextauth #trouble-shooting #backend #sever-action 

# `headers was called outside a request scope`
- Next.js 
- NextAuth.js

![[Screenshot 2025-09-03 at 16.29.02.png]]

---
## Situation
- sign out 버튼을 누르면 에러 발생

```tsx
"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { signOut } from "@/lib/auth";
import { Button } from "./ui/button";

export default function SignOutButton() {
  const session = useSession();
  if (!session?.data?.user) {
    redirect("/");
  }
  const logout = async () => await signOut({ redirectTo: "/login" });

  return (
    <Button onClick={logout} variant={"info"}>
      Sign Out {session.data.user.name}
    </Button>
  );
}
```

```tsx 
// @/lib/auth
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Github from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Kakao from "next-auth/providers/kakao";
import Naver from "next-auth/providers/naver";
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  providers: [Google, Github, Kakao, Naver, Credentials],
  session: {
    strategy: "jwt",
  },
  secret: process.env.AUTH_SECRET as string,
});
```

---
## Problem
- NextAuth의 `signOut()`을 클라이언트 컴포넌트(onClick) 안에서 호출
	- 이 함수는 server component / server action 에서만 쓸수 있음
👉 `signOut`은 Request / Response 흐름 안에서만 처리 가능

### auth의 `signOut`
1. 현재 요청의 쿠키에서 세션 토큰(JWT or session ID)을 찾음 → `cookies()` 필요
2. 이 토큰을 무효화(삭제)함 → 응답에 빈 쿠키를 심음 → `cookies().set()` 필요
3. 필요하면 header를 참조해서 리다이렉트 동작 처리 → `headers()` 필요
👉 쿠키 삭제와 세션 무효화 작업은 모두 **Next.js 서버 API** (`cookies()`, `headers()`)를 사용함 

### `cookies()`, `headers()` 
> Next.js 의 Request/Response 관련 데이터를 다루는 빌트인 함수
- `cookies()` : 현재 request 의 쿠키에 접근하거나, response에 쿠키를 설정
- `headers()` : 현재 request의 header 정보를 읽을수 있음

### Request / Response
- Web은 request → response 흐름으로 움직임
- Request : 브라우저가 서버에 "이 페이지 주세요"라고 요청하면 
	- HTTP header, cookies 같은 데이터를 같이 전송함
- Response : 서버가 브라우저에 응답을 돌려줄 때
	- header와 cookies를 내려줄수 있음 

> 정리하면,
> 	NextAuth의 `signOut`함수는 Server API를 호출하기 때문에 client에서 직접 호출할수 없음! <br>
> 	👉 Client side에서 Server API를 호출하면 안됨!

---

## Error Fix 
### 1. Client와 Server의 작업을 분리해서 사용
	- Client에서는 **next-auth/react**의 `signOut`을 호출
		- `import { signOut } from "next-auth/react";`

### 2. Server Action을 통해서 auth의 signOut 호출
- `signOut`을 호출하는 server action 컴포넌트로 분리 
```tsx
// @/app/sign/sign.action
"use server";

import { signOut } from "@/lib/auth";

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};

```
- client에서는 route역할을 하는 server action 호출
```tsx
"use client";

import { redirect } from "next/navigation";
import { useSession } from "next-auth/react";
import { logout } from "@/app/sign/sign.action";  // <- FIX : Call Server action
import { Button } from "./ui/button";

export default function SignOutButton() {
  const session = useSession();
  if (!session?.data?.user) {
    redirect("/");
  }

  return (
    <form action={logout}>  
      <Button variant={"info"}>Sign Out {session.data.user.name}</Button>
    </form>
  );
}

```


---
## Reference
- [Auth.js docs](https://authjs.dev/getting-started/session-management/login?framework=Next.js)
- [Next.js Blog - Middleware ](https://nextjs.org/blog/next-15-5#nodejs-middleware-stable)