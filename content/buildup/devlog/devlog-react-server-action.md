#devlog #study  #react #nextjs #server-action

# devlog-nextjs-server-action

- 새싹 풀스택 과정 강의
- 

---

# 내어보기
- server action은 무조건 server에서 호출
- Because the underlying network calls are always **asynchronous**, `'use server'` can only be used on **async functions**.
	- `Promise`를 리턴하는 함수만 export 가능!
- The resulting Server Functions **can be passed to Client Components through props**.

---
# 의문갖기

## react에서 `use client`를 붙이지 않으면 RSC라고 했는데 왜 `use server`를 붙여야 server action이 되지?


- {{question2}}

---

## 참고하기

- [next.js docs](https://nextjs.org/docs/app/guides/forms)
- [react docs](https://react.dev/reference/rsc/use-server)

---

## 찾아보기
{{additional-notes}}

## 액션아이템

- [ ] {{action1}}
- [ ] {{action2}}
- [ ] {{action3}}

