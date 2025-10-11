#devlog #study  #trouble-shooting #nextjs #middleware #runtime-error

# `Error: URL is malformed`

```bash
💻 - middleware.ts - session: null
 ⨯ Error: URL is malformed "/sign?redirectTo=/my". Please use only absolute URLs - https://nextjs.org/docs/messages/middleware-relative-urls
    at middleware (middleware.ts:13:38)
  11 |
  12 |   const didLogin = !!session?.user?.email;
> 13 |   if (!didLogin) return NextResponse.redirect(`/sign?redirectTo=${pathname}`);
     |                                      ^
  14 |
  15 |   return NextResponse.next();
  16 | } {
  [cause]: TypeError: Invalid URL
      at middleware (middleware.ts:13:38)
    11 |
    12 |   const didLogin = !!session?.user?.email;
  > 13 |   if (!didLogin) return NextResponse.redirect(`/sign?redirectTo=${pathname}`);
       |                                      ^
    14 |
    15 |   return NextResponse.next();
    16 | } {
    code: 'ERR_INVALID_URL',
    input: '/sign?redirectTo=/my'
  }
}
```
- 

---

# 내어보기

- {{insight1}}
- {{insight2}}
- {{insight3}}


---
# 의문갖기

- {{question1}}
- {{question2}}

---

# 참고하기

- {{reference1}}
- {{reference2}}

---

# 찾아보기
{{additional-notes}}

