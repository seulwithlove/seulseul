#devlog #study  #nextjs #react #app-router #fullstack

# Next.js study notes

- 한 입 크기로 잘라먹는 Next.js(v15)
- 새싹 풀스택 과정
	- 강의 듣고 정리
	- *LLM 활용 내용 보충*

*...업데이트중...*

---

# 의문갖기
## Sever Action에 `async` `await`을 붙이지 않아도 작동한다?
> Next Auth로 SNS 로그인을 구현하는데, login 서버액션을 호출할때 `await` 없이도 로그인이 되는걸 확인

```tsx
// @/app/sign/sign.action.ts
"use server";

import { signIn, signOut } from "@/lib/auth";

type Provider = "google" | "github" | "naver" | "kakao";

export const login = async (provider: Provider, callback?: string) => {
  await signIn(provider, { redirectTo: callback || "/bookcase" });
};

export const logout = async () => {
  await signOut({ redirectTo: "/" });
};
```

```tsx
// @/app/sign/google-login-button.tsx
import { Button } from "@/components/ui/button";
import { login } from "./sign.action";

export function GoogleLoginButton() {
  return (
    <Button
      onClick={() => login("google")} /> // async - await 없어도 실행 O!
      // ...
	)
	// ...
}
```
### 1. Server Action 은,
- Next.js App Router에서 클라이언트(Browser나 Server Component)에서 호출할 수 있는, 서버에서 실행되는 함수
	- `use server` 선언으로 표시된 함수
	- 항상 서버에서만 실행됨 (hydration X)
	- 호출하면 **Promise**를 반환
=> 브라우저 - 서버 사이의 API 호출을 Next.js가 처리해주기 때문에 API route를 따로 만들지 않아도 OK

### 2. `async / await`는 왜 쓰는거지?
> JS의 single thread 문제를 해결하기 위해!
- 비동기 작업(`Promise`, `callback`)을 동기적으로 실행하게 해줌
	- `await` : Promise의 실행이 끝날때까지 기다렸다가 결과를 리턴
	- `async` : 이게 붙은 함수는 항상 `Promise`를 리턴하도록 함 => `await` 사용 가능

### 3. 그렇다면 어떻게 `await` 없이도 서버액션이 실행될까?
- 위 코드를 보면, 버튼의 onClick 이벤트에 login 서버액션을 호출하는 화살표 함수가 실행된다
- login 서버액션을 호출하면 Next Auth는 내부적으로 Redirect를 일으킨다
	- await 여부와 상관없이(결과를 리턴받는지와 관계없이) 해당 서버액션은 호출하면 브라우저가 곧바로 이동
- 유저 입장에서는 화면이 전환되기때문에 = 로그인 된 페이지로 이동하기때문에 동일한 동작을 하는것처럼 보게 됨

### 4. 그러면 언제 `await`을 사용할까?
> - server action의 결과(리턴)값을 사용하거나
> - 실행 완료를 보장하고 싶을때

- 만약 아래처럼 Promise 리턴 값을 사용하는 방식이라면 `async / await`은 꼭 필요함!

```tsx
// 결과값 필요 O → await 필요
onClick={async () => {
  const user = await login("google");
  console.log(user); // Promise 리턴값을 사용하는 경우
}}
```

#### Server Action에서 `async/await` 사용 구분

| 액션 종류                       | 예시                                 | `await` 필요 여부 | 이유                                                 |
| --------------------------- | ---------------------------------- | ------------- | -------------------------------------------------- |
| **리다이렉트 기반 액션**             | `signIn()`, `signOut()` (NextAuth) | ❌ 선택적         | 호출만 해도 브라우저 리다이렉트가 일어나므로 Promise 결과를 안 써도 됨        |
| **데이터 반환 액션**               | DB 조회, API 호출 결과 반환                | ✅ 필요          | 반환된 데이터를 UI나 로직에서 활용해야 하므로 반드시 결과 대기 필요            |
| **부작용(side effect)만 있는 액션** | 로그 기록, 통계 저장                       | ❌ 선택적         | 결과값이 중요하지 않고 실행만 보장되면 됨. 단, 실행 완료 확인하려면 `await` 필요 |
| **후속 로직이 있는 액션**            | 로그인 후 `toast("성공")` 띄우기            | ✅ 필요          | 액션이 끝난 뒤에만 실행돼야 하므로 `await` 필요                     |
| **에러 핸들링이 필요한 경우**          | try/catch로 잡아서 처리                  | ✅ 필요          | `await`이 없으면 에러가 Promise에 묶여서 catch되지 않음           |

## `RootLayout` 안에 page.tsx를 import해서 넣은 적이 없는데 어떻게 렌더링되지?

> Next.js App router는 `{children}` 자리에 자동으로 하위 route component(page.tsx)를 끼워넣는다
```bash
app/
 ├─ layout.tsx        (RootLayout)
 ├─ page.tsx          (홈 페이지 /)
 └─ about/
     └─ page.tsx      (/about)
```

이런 구조일때
- user가 `/` URL 요청
	→ Next.js는 `app/page.tsx`를 찾아서  
    → `app/layout.tsx`의 `{children}` 자리에 자동으로 넣음
- user가 `/about` URL 요청  
    → Next.js는 `app/about/page.tsx`를 찾아서  
    → `app/layout.tsx`의 `{children}` 자리에 넣음


## `useSearchParams`는 query string을 비동기로 가져오는데 왜 비동기 코드를 쓰지 않지?

> `useSearchParams`는 동기적인 값!
```tsx
"use client";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const search = searchParams.get("q"); // 그냥 동기적으로 사용
  return <div>검색어: {search}</div>;
}
```
- 브라우저에서 `window.location.search`를 쓰면 현재 URL의 query string을 바로 가져옴
	- 네트워크 요청(fetch)이 아니라 현재 브라우저 주소창의 값을 가져옴
- React state처럼 라우트가 바뀌면 자동으로 갱신됨
	- "dynamically evaluated" 
		- 빌드 시점에는 알수 없고, 요청(request) 시점에만 알수 있음

### 왜 buildtime error가 나서 \<Suspense> 컴포넌트로 감싸줘야하는걸까?
> `useSearchParams`는 reactive state라서 내부적으로 Suspense-ready로 감싸고 있다 => runtime에서 준비될때까지 Suspense fallback을 그려줘야함

- `useSearchParmas`는 Client component!
	- build time에는 존재하지 않는 값
	- 값이 준비되기 전에는 pending 상태로 둠(React Suspense 기반 "lazy" 값)
		- 이 때문에 `<Suspense>`로 감싸줘야함


## 왜 React 대신에 Next.js를 쓰는걸까?
> Next.js는 React의 단점인 초기 로딩 속도와 SEO 문제를 해결하고, SSR·SSG·ISR 같은 다양한 렌더링 방식을 제공해서 더 나은 사용자 경험과 SEO 검색노출을 보장한다

### CSR(Client Side Rendering) - React
- 초기에는 빈 HTML + JS만 내려와서 브라우저가 실행하는데 시간이 필요 : 첫 로딩 속도 느림
- 크롤러는 JS 실행 전이라 콘텐츠를 읽지 못해서 SEO 불리

### Next.js
- React의 생태계를 그대로 쓰면서도 라우팅, API Routes 등 풀스택 기능 제공
- **SSR (Server-Side Rendering)**: 서버에서 완성된 HTML을 내려주기 때문에 초기 속도 빠르고 SEO 친화적
- **SSG (Static Site Generation)**: 빌드시 HTML 생성 → 속도 매우 빠르고 트래픽에 강함
- **ISR (Incremental Static Regeneration)**: static 페이지도 일정주기마다 갱신 가능 → 최신성 + 성능 모두 갖춤


- *면접질문으로 자주 나옴*
	- 해당 회사 서비스 분석해서 어디 페이지를 어떤 렌더링 방식으로 사용하면 좋은지 함께 덧붙여 대답하면 좋은 대답으로 만들수 있음!

---

# 내어보기

- dynamic page에서 비동기로 값을 가져오는 경우에도 static page를 미리 만들어 둘수 있음
	- app-router 의 `generateStaticParams` : 어떤 종류의 데이터를 받는지 샘플로 만들어둠
		- 여기에서 리턴하는 객체의 값은 "string"만 가능함
	- page-router의 `getStaticPath`와 동일한 기능

## streaming
- 큰 데이터를 잘게 쪼개서 연속적으로 보내는 기술
- 모든 데이터를 전달받지 않은 상태에서 화면을 끊김없이 볼수 있음
	- async - 느리게 렌더링 되는 부분 : 대체 UI(로딩바)를 보여주기
- dynamic page에서 활용
	- cf. Static page는 full route cache에 저장됨
- UX : user experience가 중요함!!

### Page streaming
- 동일 라우터에 있는 page에 대한 스트리밍의 대체 UI(loading)를 설정하려면 `loading.tsx`생성
- 주의사항
	- component에 대해서는 설정X
	- query string 값의 변화에 대해서는 page이동이 아니기때문에 설정할수 없음
	- 비동기-dynamic page에 대해서만 적용됨

### Component streaming
- `Suspense` 활용


- Skeleton UI : 뼈대만 보여주는 UI
  

## Server Actions ✨✨✨
- 서버에서만 실행할 수 있는 동작을 브라우저에서 실행하는 것
	- `"use server"` 추가하면 서버액션으로 실행됨
		- 서버액션을 실행하는 API가 생성되어 브라우저에서 해당 서버액션을 실행하는 작업을 했을때 이 API를 호출하게 됨
- 클라이언트 코드(예: 컴포넌트, 폼)에서 서버 코드를 직접 실행할 수 있게 해주는 기능
	- 별도의 API 라우트를 정의할 필요 없이 클라이언트와 서버 간의 데이터 통신을 간소화
- 서버에서만 실행되는 코드이기때문에 브라우저에서는 호출만 가능
	-  => 보안상 문제가 되는 코드를 다루기 좋음
- 간결하고 간단하고 편하고 안전하게 서버에서 실행하는 코드를 만들수 있음!
- HTML `<form>`
	- `action` 속성에 서버 액션 함수를 지정하면, 폼 제출 시 입력된 데이터가 자동으로 `formData` 객체로 구성됨
	- 해당 서버 액션 함수의 첫 번째 매개변수로 전달
	- 이 객체에서 `get` 메서드로 필요한 값을 추출
- `revalidatePath(path)`
	- 이 옵션으로 서버액션으로 얻은 데이터를 바로 화면에 렌더링 할수 있음
	- 서버 컴포넌트에서만 호출 가능
	- 해당 경로의 cache된 데이터, full-route-cache는 무효화됨
		- 데이터가 삭제되고 다시 생성되지는 않음
		- 1)새로고침 후 2)다시 해당 페이지에 접속하면 dynamic page처럼 새로운 데이터를 렌더링하고, 해당 페이지를 full-route-cache로 등록
- `useActionState`
	- 클라이언트 컴포넌트에서 Server Action을 사용할 때, 폼 제출 상태(로딩 중 여부 등)를 관리하고 중복 제출을 방지하기 위해 권장되는 React 훅


- hidden input tag에는 `readOnly` attribute tag를 설정해줘야함

- `div` or `form` 태그로 버튼 기능을 만들고 싶으면 -> `useRef`사용!

## Parallel route & Intercepting route
- @ : slot
- (.)*폴더명* : route group 
	- 인터셉팅할 페이지를 갖고 있는 폴더
- intercepting route는 **CSR방식으로 페이지를 이동하는 경우**(navigation or )일때만 가능
	- modal 페이지로 띄움
- 특정 페이지를 intercept해서 Modal로 띄우고 배경은 parallel route를 활용해 기존의 페이지를 띄우면 자연스러운 UI를 만들수 있음

## ComponentProps
- 특정 컴포넌트의 prop들을 키로 받아서 그 자체를 사용?

## [[devlog-nextauth|Auth.js]]


## SessionProvider
> 리액트의 Context Provider(API) 와 같은 역할
- 앱의 최상위(`layout.tsx` or `_app.tsx`)에 넣어서 **모든 컴포넌트에서 세션 정보를 쓸수 있게 함**
	- e.g.`useSession()` 
- 쿠키에 저장된 session을 읽어와서 리액트 state로 관리


### `useSession`
- 클라이언트 컴포넌트에서 현재 로그인 상태를 가져오는 훅
- return `{data: session, status}`
	- `session` : 로그인된 사용자 정보(없으면 null)
	- `status` : `"loading" | "authenticated" | "unauthenticated"`
=> 로그인 버튼, 프로필 표시, 로그아웃 버튼 같은 UI에서는 **쿠키를 직접 다루지 않고, 세션 상태만 확인하면 됨**

> `SessionProvider`는 session을 리액트 state로 전역에 제공함, `useSession`은 개별 컴포넌트에서 그 상태(현재 로그인 정보, 사용자 정보)를 읽어올수 있게 함 -> 개발자는 쿠키를 직접 다루지 않고 인증 상태를 관리할수 있게 됨


## Runtime 
### Node.js
- 서버에서 JS를 실행할 수 있게 함
- `server action` 실행, API Routes(`app/api/*/route.ts`)
- DB연결, 무거운 서버 로직(파일 읽기/쓰기)

### Edge Runtime
- 가벼운 서버 실행환경 (e.g. Vercel)
- Node 보다 제한적이지만, 전 세계 CDN에 가까운 위치(edge)에서 실행돼서 응답이 빠름
- `middleware.ts` 실행
	- 요청(Request)이 들어올때 가장 먼저 실행되서 빠르게 Redirect, 인증체크 등을 할수 있음
- 일부 Route handler(`export const runtime = 'edge'`)
- `fetch`, Web API 스타일의 API 호출
- 제한사항
	- 파일 시스템 접근 X
	- 특정 Node.js API (`fs`, `net`, `child_process`) X

#### Middleware
- 클라이언트 Request - Server Response 사이에서 동작하는 코드
- Next.js에서 페이지 렌더링 전에 실행되면서 요청을 가로채서 조건에 따라 리다이렉트, 응답 수정 등을 함
- 특징
	- 항상 Edge에서 실행
	- page/route 들어가기 전에 실행
	- 인증체크, i18n(언어 라우팅), A/B 테스트 등에 자주 사용



---

## 참고하기

- [Next.js Blog](https://nextjs.org/blog)
- [Bootstrap Docs-Colors](https://getbootstrap.com/docs/5.3/customize/color/#colors)

---

## 찾아보기
- [ ] GET/POST 기본 개념
- [ ] WS / WAS
	- Edge : auth 함수
	- Node : signIn, signOut 함수
