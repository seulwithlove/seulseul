---
created: 2025-10-10T18:08
updated: 2025-12-01T22:21
---
#devlog #study  #react #nextjs #server-action

# Next.js Server Action  📝

---

# 내어보기
- <u>클라이언트(Browser나 Server Component)에서 호출할 수 있는, 서버에서 실행되는 함수</u>
	- 서버에서만 실행할 수 있는 동작을 브라우저에서 실행하는 것
	- `"use server"` 추가하면 서버액션으로 실행됨
		- 서버액션을 실행하는 API가 생성되어 브라우저에서 해당 서버액션을 실행하는 작업을 했을때 이 API를 호출하게 됨
		- server action은 무조건 server에서 호출
- 클라이언트 코드(예: 컴포넌트, 폼)에서 서버 코드를 직접 실행할 수 있게 해주는 기능
	- The resulting Server Functions **can be passed to Client Components through props**.
	- 별도의 API 라우트를 정의할 필요 없이 클라이언트와 서버 간의 데이터 통신을 간소화
- Because the underlying network calls are always **asynchronous**, `'use server'` can only be used on **async functions**.
	- `Promise`를 리턴하는 함수만 export 가능!
- 간결하고 간단하고 편하고 안전하게 서버에서 실행하는 코드를 만들수 있음!
	- 서버에서만 실행되는 코드이기때문에 브라우저에서는 호출만 가능
		-  => 보안상 문제가 되는 코드를 다루기 좋음

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
'use client';

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
