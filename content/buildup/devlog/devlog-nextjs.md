#devlog #study  #nextjs #react #app-router #fullstack

# Next.js study notes

- 한 입 크기로 잘라먹는 Next.js(v15)
- 새싹 풀스택 과정
	- 강의 듣고 정리
	- *LLM 활용 내용 보충*

*...업데이트중...*

---

## 내어보기

- dynamic page에서 비동기로 값을 가져오는 경우에도 static page를 미리 만들어 둘수 있음
	- app-router 의 `generateStaticParams` : 어떤 종류의 데이터를 받는지 샘플로 만들어둠
		- 여기에서 리턴하는 객체의 값은 "string"만 가능함
	- page-router의 `getStaticPath`와 동일한 기능

### streaming
- 큰 데이터를 잘게 쪼개서 연속적으로 보내는 기술
- 모든 데이터를 전달받지 않은 상태에서 화면을 끊김없이 볼수 있음
	- async - 느리게 렌더링 되는 부분 : 대체 UI(로딩바)를 보여주기
- dynamic page에서 활용
	- cf. Static page는 full route cache에 저장됨
- UX : user experience가 중요함!!

#### Page streaming
- 동일 라우터에 있는 page에 대한 스트리밍의 대체 UI(loading)를 설정하려면 `loading.tsx`생성
- 주의사항
	- component에 대해서는 설정X
	- query string 값의 변화에 대해서는 page이동이 아니기때문에 설정할수 없음
	- 비동기-dynamic page에 대해서만 적용됨

#### Component streaming
- `Suspense` 활용


- Skeleton UI : 뼈대만 보여주는 UI
  

### Server Actions
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

---
## 의문갖기

### `RootLayout` 안에 page.tsx를 import해서 넣은 적이 없는데 어떻게 렌더링되지?

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


### `useSearchParams`는 query string을 비동기로 가져오는데 왜 비동기 코드를 쓰지 않지?

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

#### 그러면 왜 buildtime error가 나서 \<Suspense> 컴포넌트로 감싸줘야하는거지?
> `useSearchParams`는 reactive state라서 내부적으로 Suspense-ready로 감싸고 있다=> runtime에서 준비될때까지 Suspense fallback을 그려줘야함

- `useSearchParmas`는 Client component!
	- buildtime에는 존재하지 않는 값
	- 값이 준비되기 전에는 pending 상태로 둠(React Suspense 기반 "lazy" 값)
		- 이 때문에 \<Suspense>로 감싸줘야함

## React 대신에 Next.js를 왜 쓰는걸까?

- 성진님 코멘트 정리 ![[IMG_0407.jpg]]
	- <span style="background:#fdbfff">면접질문으로 자주 나옴</span>
		- 해당 회사 서비스 분석해서 어디 페이지를 어떤 렌더링 방식으로 사용하면 좋은지 함께 덧붙여 대답하면 좋은 대답으로 만들수 있음!

---

## 참고하기

- {{reference1}}
- {{reference2}}

---

## 찾아보기
{{additional-notes}}
